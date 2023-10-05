import { PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import { getBanners } from '$lib/database/banners'
import { getCountriesPreview } from '$lib/database/countries'
import { getExternalOrigins, getPageLinks } from '$lib/services/api'
import { LANGUAGE_CODES, getLanguage, isDefaultLanguage } from '$lib/utils/language'
import type { EntryGenerator, PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const featured = getBanners({ language })
  const countriesPreview = getCountriesPreview()

  return {
    metadata: {
      title: 'Inicio',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
      preconnect: getExternalOrigins([PUBLIC_IMAGE_CDN_ENDPOINT, 'http://api.mapbox.com']),
    },
    featured,
    countriesPreview,
  }
}) satisfies PageServerLoad

export const entries: EntryGenerator = () =>
  LANGUAGE_CODES.map((lang) => ({ lang: isDefaultLanguage(lang) ? '' : lang }))
