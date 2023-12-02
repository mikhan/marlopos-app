import MiniSearch, { type AsPlainObject, type Options } from 'minisearch'
import { removeDiacritics } from '$core/utils/string'

export type SearchResult = { [k: string]: unknown; type: string }
export type Document<T extends SearchResult = SearchResult> = {
  id: string
  data: T
}

export type DocumentIndex<T extends object> = { documents: object[]; fields: (keyof T & string)[] }
export type DocumentIndexProvider<T extends object> = (
  options: DocumentIndexProviderOptions,
) => Promise<DocumentIndex<T>>
export type DocumentIndexProviderOptions = { locale: string }

const documentIndexProviders = new Map<string, DocumentIndexProvider<object>>()

export function addDocumentIndexProvider<T extends SearchResult>(type: string, provider: DocumentIndexProvider<T>) {
  documentIndexProviders.set(type, provider as unknown as DocumentIndexProvider<object>)
}

async function getDocuments(
  options: DocumentIndexProviderOptions,
): Promise<DocumentIndex<SearchResult & Record<string, string>>> {
  const documentIndexes = await Promise.all(Array.from(documentIndexProviders.values(), (fnc) => fnc(options)))
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

export async function getSearchIndex({ locale }: DocumentIndexProviderOptions): Promise<SearchIndex> {
  const { documents, fields } = await getDocuments({ locale })
  const options: Options = {
    fields,
    storeFields: ['data'],
    extractField: (document, field) => {
      const value = document[field]
      return typeof value === 'string' ? removeDiacritics(value) : value
    },
  }
  const engine = new MiniSearch(options)
  engine.addAll(documents)

  return { data: engine.toJSON(), options }
}
