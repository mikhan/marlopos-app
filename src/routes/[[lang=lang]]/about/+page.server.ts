import { getPageLinks } from '$lib/services/api'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, locals }) => {
  return {
    metadata: {
      title: 'Nosotros',
      description: 'Quiénes somos',
      lang: locals.lang.code,
      links: getPageLinks(url, locals.lang.code),
      preconnect: [],
    },
  }
}) satisfies PageServerLoad
