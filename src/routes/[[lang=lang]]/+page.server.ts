import { PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import { getCountriesPreview } from '$lib/database/countries'
import { getFeatured } from '$lib/database/featured'
import { getExternalOrigins, getPageLinks } from '$lib/services/api'
import { LANGUAGE_CODES, isDefaultLanguage } from '$lib/utils/language'
import type { EntryGenerator, PageServerLoad } from './$types'

export const load = (async ({ url, params, locals }) => {
  const featured = getFeatured({ language: locals.lang })
  const countriesPreview = getCountriesPreview()

  return {
    metadata: {
      title: 'Inicio',
      description: 'Agencia de viajes Marlopos',
      lang: locals.lang.code,
      links: getPageLinks(url, params.lang),
      preconnect: getExternalOrigins([PUBLIC_IMAGE_CDN_ENDPOINT, 'https://api.mapbox.com']),
    },
    featured,
    countriesPreview,
  }
}) satisfies PageServerLoad

export const entries: EntryGenerator = () =>
  LANGUAGE_CODES.map((lang) => ({ lang: isDefaultLanguage(lang) ? '' : lang }))
