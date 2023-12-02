import { getResourceHref, transformURL } from '$core/services/resource-provider'
import { api } from '$lib/services/api'
import type { DocumentIndexProvider, SearchResult } from '$lib/services/search'

export interface PackageSearchResult extends SearchResult {
  type: 'package'
  title: string
  description: string
  href: string
  cover: { src: string; width: number; height: number }
}

export const packagesIndexProvider: DocumentIndexProvider<PackageSearchResult> = async (options) => {
  const { data, error } = await api
    .from('package')
    .select(
      `
      id,
      translations:package_translations!inner (
        title:name,
        description,
        content,
        notes
      ),
      destinations:package_destination (
        destination (
          translations:destination_translations!inner (
            name
          )
        )
      ),
      cover (
        filename_disk
      )`,
    )
    .eq('status', 'published')
    .eq('package_translations.languages_code', options.locale)
    .throwOnError()
    .returns<
      {
        id: string
        translations: [
          {
            title: string
            description: string
            content: string
            notes: string
          },
        ]

        destinations: {
          destination: {
            translations: [{ name: string }]
          }
        }[]
        cover: {
          filename_disk: string
        }
      }[]
    >()

  if (error) throw error

  return {
    documents: data.map(({ id, translations: [{ title, description, content, notes }], destinations, cover }) => ({
      id,
      title,
      description,
      content,
      notes,
      destinations: destinations.map(({ destination }) => destination.translations[0].name).join('|'),
      data: {
        type: 'package',
        title,
        description,
        href: `/packages/${id}`,
        cover: {
          src: transformURL(getResourceHref(cover.filename_disk, { w: 80, h: 45 })),
          width: 80,
          height: 45,
        },
      },
    })),
    fields: ['title', 'description', 'content', 'notes', 'destinations'],
  }
}
