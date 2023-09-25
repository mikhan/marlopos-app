import { getInformation } from '$lib/database/information'
import { getLanguage } from '$lib/utils/language'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ params }) => {
  const language = getLanguage(params.lang)
  const information = getInformation()

  return { language, information }
}) satisfies LayoutServerLoad
