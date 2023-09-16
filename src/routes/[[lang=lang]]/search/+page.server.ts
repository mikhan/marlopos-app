import { getPageLinks } from '$lib/services/api'
import { type SearchResult, search } from '$lib/services/search'
import { LANGUAGE_CODES, getLanguage, isDefaultLanguage } from '$lib/utils/language'
import type { EntryGenerator, PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const query = url.searchParams.get('q')
  let searchResults: SearchResult[] = []

  if (query) {
    searchResults = await search(query, { language })
  }

  return {
    metadata: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
    searchResults,
  }
}) satisfies PageServerLoad

export const entries: EntryGenerator = () =>
  LANGUAGE_CODES.map((lang) => ({ lang: isDefaultLanguage(lang) ? '' : lang }))

export const prerender = false
