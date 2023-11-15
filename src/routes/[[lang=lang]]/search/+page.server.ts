import { getPageLinks } from '$lib/services/api'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, locals }) => {
  return {
    metadata: {
      title: 'Viajes Marlopos',
      description: 'Agencia de viajes Marlopos',
      lang: locals.lang.code,
      links: getPageLinks(url, locals.lang.code),
      preconnect: [],
    },
  }
}) satisfies PageServerLoad

export const prerender = false
