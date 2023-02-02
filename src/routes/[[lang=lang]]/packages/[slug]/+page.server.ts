import { error } from '@sveltejs/kit'
import { getPackages } from '$lib/database/package'
import { getLanguage } from '$lib/utils/language'
import { getPageLinks } from '$lib/services/api'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const slug = params.slug
  const [content] = await getPackages({ language, slug })

  if (!content) {
    throw error(404, { message: 'Not found' })
  }

  return {
    meta: {
      title: content.name,
      description: content.description,
      lang: language.code,
      links: getPageLinks(url, params.lang),
    },
    content,
  }
}) satisfies PageServerLoad<Api.Resource>
