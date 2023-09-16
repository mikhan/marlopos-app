import { api } from '$lib/services/api'
import type { DocumentIndexProvider } from '$lib/services/search'

export const packagesIndexProvider: DocumentIndexProvider = async (options) => {
  const { data, error } = await api
    .from('package_translations')
    .select(
      `
        id,
        name,
        description,
        content`,
    )
    .eq('languages_code', options.language.locale)
    .throwOnError()
    .returns<
      {
        id: number
        name: string
        description: string
        content: string
        locale: string
      }[]
    >()

  if (error) throw error

  const documents = data.map(({ id, name, description, content }) => ({
    id: id.toString(),
    type: 'package',
    title: name,
    description,
    content: content.replace(/<[^>]*>?/gm, ''),
    href: `/packages/${id}`,
  }))

  const fields = ['title', 'description', 'content', 'aba']

  return { documents, fields }
}
