import { getLanguage } from '$lib/utils/language'
import type { LayoutServerLoad } from './$types'
import { getInformation } from '$lib/database/information'

export const load = (async ({ params, url }) => {
  const language = getLanguage(params.lang)
  const information = getInformation()
  const { href } = url

  return { language, information, href }
}) satisfies LayoutServerLoad
