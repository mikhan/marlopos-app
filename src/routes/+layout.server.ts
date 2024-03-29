import { getInformation } from '$lib/database/information'
import type { LayoutServerLoad } from './$types'

export const load = (async () => {
  const information = getInformation()

  return { information }
}) satisfies LayoutServerLoad

export const trailingSlash = 'always'
export const prerender = true
