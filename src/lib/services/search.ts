import MiniSearch, { type SearchResult as Result, type Suggestion } from 'minisearch'
import type { Language } from '$lib/utils/language'

interface Document {
  id: string
  type: string
  title: string
  description: string
  href: string
}

export type DocumentIndex = { documents: Document[]; fields: string[] }
export type DocumentIndexProvider = (options: { language: Language }) => Promise<DocumentIndex>
export type SearchResult = Prettify<Result & Document>
export type { Suggestion }

const documentIndexProviders = new Set<DocumentIndexProvider>()
export function addDocumentIndexProvider(provider: DocumentIndexProvider) {
  documentIndexProviders.add(provider)
}

async function getDocuments({ language }: { language: Language }): Promise<DocumentIndex> {
  const documentIndexes = await Promise.all(Array.from(documentIndexProviders.values(), (fnc) => fnc({ language })))
  const fields = new Set<string>()
  const documents: Document[] = []

  for (const provider of documentIndexes) {
    provider.fields.forEach((field) => fields.add(field))
    provider.documents.forEach((document) => documents.push(document))
  }

  return { documents, fields: [...fields] }
}

const searchIndexes = new Map<string, MiniSearch<Document>>()
const cleanupIndex = new Map<string, NodeJS.Timeout>()
const indexTTL = 5_000

async function getSearchIndex({ language }: { language: Language }) {
  const cleanup = cleanupIndex.get(language.locale)
  if (cleanup) {
    clearTimeout(cleanup)
    cleanupIndex.delete(language.locale)
  }

  let searchIndex = searchIndexes.get(language.locale)

  if (!searchIndex) {
    const { documents, fields } = await getDocuments({ language })

    console.log('create index', language.locale)
    searchIndex = new MiniSearch<Document>({
      fields,
      storeFields: ['id', 'type', 'title', 'description', 'href'],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    })
    searchIndex.addAll(documents)
    searchIndexes.set(language.locale, searchIndex)
  }

  cleanupIndex.set(
    language.locale,
    setTimeout(() => {
      console.log('clear index', language.locale)
      searchIndexes.delete(language.locale)
      cleanupIndex.delete(language.locale)
    }, indexTTL),
  )

  return searchIndex
}

export async function search(query: string, { language }: { language: Language }) {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex.search(query) as SearchResult[]
}

export async function getSuggestions(query: string, { language }: { language: Language }) {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex.autoSuggest(query, {
    combineWith: 'OR',
    fuzzy: false,
  }) as Suggestion[]
}
