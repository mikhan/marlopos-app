import { api } from '$lib/services/api'
import type { DocumentIndexProvider, SearchResult } from '$lib/services/search'

export interface PackageSearchResult extends SearchResult {
  type: 'package'
  title: string
  description: string
  content: string
  href: string
}

export const packagesIndexProvider: DocumentIndexProvider<PackageSearchResult> = async (options) => {
  console.log('packagesIndexProvider')
  type Result = {
    id: number
    name: string
    description: string
    content: string
    locale: string
  }
  const query = `
    id,
    name,
    description,
    content`
  const { data, error } = await api
    .from('package_translations')
    .select(query)
    .eq('languages_code', options.language.locale)
    .throwOnError()
    .returns<Result[]>()

  if (error) throw error

  return {
    documents: data.map(({ id, name, description, content }) => ({
      id: id.toString(),
      title: name,
      description,
      content: content.replace(/<[^>]*>?/gm, ''),
      data: {
        type: 'package',
        title: name,
        description,
        href: `/packages/${id}`,
      },
    })),
    fields: ['title', 'description', 'content'],
  }
}
