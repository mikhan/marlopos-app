import { getBanners } from '$lib/database/banners'
import { getCountriesPreview } from '$lib/database/countries'
import { getPageLinks } from '$lib/services/api'
import { LANGUAGE_CODES, getLanguage, isDefaultLanguage } from '$lib/utils/language'
import type { EntryGenerator, PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  console.log(url.href)
  const language = getLanguage(params.lang)
  const featured = getBanners({ language })
  const countriesPreview = getCountriesPreview()

  return {
    metadata: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
    featured,
    countriesPreview,
  }
}) satisfies PageServerLoad

export const entries: EntryGenerator = () =>
  LANGUAGE_CODES.map((lang) => ({ lang: isDefaultLanguage(lang) ? '' : lang }))
