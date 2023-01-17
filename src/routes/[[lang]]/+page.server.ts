import { getFeaturedPackages } from '$lib/directus/getFeaturedPackages'
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
  const lang = event.locals.language
  const featuredPackages = await getFeaturedPackages({ lang })

  return { lang, featuredPackages }
}) satisfies PageServerLoad
