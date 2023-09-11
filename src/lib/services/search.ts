import MiniSearch, { type SearchResult as Result, type Suggestion } from 'minisearch'
import type { Language } from '$lib/utils/language'

interface Document {
  id: string
  title: string
  description: string
  href: string
}

// export type SearchDocument = Document & Record<string, unknown>
// export type SearchDocumentProviderOptions = { language: Language }
// export type DocumentIndex<T extends Record<string, unknown>> = {
//   documents: Array<Document & T>
//   fields: Array<keyof T>
// }
export type DocumentIndex = { documents: Document[]; fields: string[] }
export type DocumentIndexProvider = (options: { language: Language }) => Promise<DocumentIndex>
export type SearchResult = Prettify<Result & Document>
export type { Suggestion }

const documentIndexProviders = new Set<DocumentIndexProvider>()
export function addDocumentIndexProvider(provider: DocumentIndexProvider) {
  documentIndexProviders.add(provider)
}

const searchIndexes = new Map<string, MiniSearch<Document>>()

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

async function getSearchIndex({ language }: { language: Language }) {
  let searchIndex = searchIndexes.get(language.locale)

  if (!searchIndex) {
    const { documents, fields } = await getDocuments({ language })

    searchIndex = new MiniSearch<Document>({
      fields,
      storeFields: ['id', 'title', 'description', 'href'],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 2,
        prefix: true,
      },
    })
    searchIndex.addAll(documents)
    searchIndexes.set(language.locale, searchIndex)
  }

  console.log(JSON.stringify(searchIndex))

  return searchIndex
}

export async function search(query: string, { language }: { language: Language }) {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex.search(query) as Array<SearchResult>
}

export async function getSuggestions(query: string, { language }: { language: Language }) {
  if (!query) return []

  const searchIndex = await getSearchIndex({ language })

  return searchIndex.autoSuggest(query) as Array<Suggestion>
}
