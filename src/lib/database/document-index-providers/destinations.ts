import { api } from '$lib/services/api'
import type { DocumentIndexProvider, SearchResult } from '$lib/services/search'

export interface DestinationSearchResult extends SearchResult {
  type: 'destination'
  href: string
  title: string
  country: { name: string }
}

export const destinationsIndexProvider: DocumentIndexProvider<DestinationSearchResult> = async (options) => {
  const { data, error } = await api
    .from('destination')
    .select(
      `
      id,
      translations:destination_translations!inner (
        title:name
      ),
      country!inner (
        name
      )`,
    )
    .eq('destination_translations.languages_code', options.locale)
    .throwOnError()
    .returns<
      {
        id: string
        translations: [
          {
            title: string
          },
        ]
        country: {
          name: string
        }
      }[]
    >()

  if (error) throw error

  return {
    documents: data.map(({ id, translations: [{ title }], country }) => ({
      id,
      title: title,
      country: country.name,
      data: {
        type: 'destination',
        href: `/destinations/${id}`,
        title,
        country,
      },
    })),
    fields: ['title', 'country'],
  }
}
