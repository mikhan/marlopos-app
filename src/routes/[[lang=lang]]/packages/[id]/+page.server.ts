import { error } from '@sveltejs/kit'
import { PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import { getPackage } from '$lib/database/packages'
import { getExternalOrigins, getPageLinks } from '$lib/services/api'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params, locals }) => {
  const id = params.id
  const page = await getPackage({ id, language: locals.lang })

  if (!page) {
    throw error(404, { message: 'Package not found' })
  }

  return {
    metadata: {
      title: page.name,
      description: page.description,
      lang: locals.lang.code,
      links: getPageLinks(url, params.lang),
      preconnect: getExternalOrigins([PUBLIC_IMAGE_CDN_ENDPOINT, 'http://api.mapbox.com']),
    },
    page,
  }
}) satisfies PageServerLoad
