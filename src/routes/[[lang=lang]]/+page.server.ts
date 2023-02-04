import { getCountriesPreview } from '$lib/database/countries'
import { getPackages } from '$lib/database/packages'
import { getPageLinks } from '$lib/services/api'
import { getLanguage } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const featured = getPackages({ language, featured: true })
  const countriesPreview = getCountriesPreview()

  return {
    meta: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
    featured,
    countriesPreview,
  }
}) satisfies PageServerLoad<Api.Resource>
