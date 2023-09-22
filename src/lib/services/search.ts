import MiniSearch, { type AsPlainObject, type Options } from 'minisearch'

// import type { Language } from '$lib/utils/language'

export type SearchResult = { [k: string]: string; type: string }
export type Document<T extends SearchResult = SearchResult> = {
  id: string
  data: T
}

export type DocumentIndex<T extends object> = { documents: object[]; fields: (keyof T & string)[] }
export type DocumentIndexProvider<T extends object> = () => Promise<DocumentIndex<T>>

const documentIndexProviders = new Map<string, DocumentIndexProvider<object>>()
export function addDocumentIndexProvider<T extends SearchResult>(name: string, provider: DocumentIndexProvider<T>) {
  documentIndexProviders.set(name, provider as unknown as DocumentIndexProvider<object>)
}

async function getDocuments(): Promise<DocumentIndex<SearchResult & Record<string, string>>> {
  const documentIndexes = await Promise.all(Array.from(documentIndexProviders.values(), (fnc) => fnc()))
  const documents: object[] = []
  const fields = new Set<string>()

  for (const provider of documentIndexes) {
    provider.fields.forEach((field) => fields.add(field))
    provider.documents.forEach((document) => documents.push(document))
  }

  return { documents, fields: [...fields] }
}

export interface SearchIndex {
  data: AsPlainObject
  options: Options
}

export async function getSearchIndex(): Promise<SearchIndex> {
  const { documents, fields } = await getDocuments()
  const options: Options = { fields, storeFields: ['data'] }
  const engine = new MiniSearch(options)
  engine.addAll(documents)

  return { data: engine.toJSON(), options }
}

let searchEngine: MiniSearch | undefined

export async function getSearchEngine(): Promise<MiniSearch> {
  if (!searchEngine) {
    const response = await fetch('/api/search/index.json')
    const { data, options } = (await response.json()) as SearchIndex
    searchEngine = MiniSearch.loadJS(data, options)
  }

  return searchEngine
}
