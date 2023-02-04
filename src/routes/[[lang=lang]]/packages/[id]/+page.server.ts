import { error } from '@sveltejs/kit'
import { getPackages } from '$lib/database/packages'
import { getLanguage } from '$lib/utils/language'
import { getPageLinks } from '$lib/services/api'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const id = params.id
  const [content] = await getPackages({ language, id })

  if (!content) {
    throw error(404, { message: 'Package not found' })
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
