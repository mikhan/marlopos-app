import { getLanguage } from '$lib/utils/language'
import type { LayoutLoad } from './$types'

export const trailingSlash = 'always'

export const load = (({ params }) => {
  const language = getLanguage(params.lang)

  return { language }
}) satisfies LayoutLoad
