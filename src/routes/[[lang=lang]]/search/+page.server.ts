import { getPageLinks } from '$lib/services/api'
import { type SearchResult, search } from '$lib/services/search'
import { getLanguage } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  console.log(url.href)
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

export const prerender = false
