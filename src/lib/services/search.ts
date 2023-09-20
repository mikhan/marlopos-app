import MiniSearch from 'minisearch'
import type { Language } from '$lib/utils/language'

export type SearchResult = { [k: string]: string; type: string }
export type Document<T extends SearchResult = SearchResult> = {
  id: string
  data: T
}

export type DocumentIndex<T extends object> = { documents: object[]; fields: (keyof T & string)[] }
export type DocumentIndexProvider<T extends object> = (options: { language: Language }) => Promise<DocumentIndex<T>>

const documentIndexProviders = new Map<string, DocumentIndexProvider<object>>()
export function addDocumentIndexProvider<T extends SearchResult>(name: string, provider: DocumentIndexProvider<T>) {
  documentIndexProviders.set(name, provider as unknown as DocumentIndexProvider<object>)
}

async function getDocuments({
  language,
}: {
  language: Language
}): Promise<DocumentIndex<SearchResult & Record<string, string>>> {
  const documentIndexes = await Promise.all(Array.from(documentIndexProviders.values(), (fnc) => fnc({ language })))
  const documents: object[] = []
  const fields = new Set<string>()

  for (const provider of documentIndexes) {
    provider.fields.forEach((field) => fields.add(field))
    provider.documents.forEach((document) => documents.push(document))
  }

  return { documents, fields: [...fields] }
}

const searchIndexes = new Map<string, MiniSearch>()
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
    searchIndex = new MiniSearch({
      fields,
      storeFields: ['data'],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    })
    searchIndex.addAll(documents)
    searchIndexes.set(language.locale, searchIndex)

    // writeFile(join(process.cwd(), 'data.json'), JSON.stringify(searchIndex), { encoding: 'utf-8' }, () => {    })
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

export async function search<T extends SearchResult>(
  query: string,
  { language }: { language: Language },
): Promise<T[]> {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex.search(query).map((result) => result['data'])
}

export async function getSuggestions(query: string, { language }: { language: Language }) {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex
    .autoSuggest(query, {
      combineWith: 'OR',
      fuzzy: false,
    })
    .map(({ suggestion }) => suggestion)
}
