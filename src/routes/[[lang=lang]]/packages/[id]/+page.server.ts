import { error } from '@sveltejs/kit'
import { PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import { getPackage } from '$lib/database/packages'
import { getExternalOrigins, getPageLinks } from '$lib/services/api'
import { getLanguage } from '$lib/utils/language'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const id = params.id
  const page = await getPackage({ language, id })

  if (!page) {
    throw error(404, { message: 'Package not found' })
  }

  return {
    metadata: {
      title: page.name,
      description: page.description,
      lang: language.code,
      links: getPageLinks(url, params.lang),
      preconnect: getExternalOrigins([PUBLIC_IMAGE_CDN_ENDPOINT, 'http://api.mapbox.com']),
    },
    page,
  }
}) satisfies PageServerLoad
