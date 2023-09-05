import { getPageLinks } from '$lib/services/api'
import { getLanguage } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)

  return {
    metadata: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
  }
}) satisfies PageServerLoad

export const prerender = true
