import { getFeaturedPackages } from '$lib/api/getFeaturedPackages'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
  const lang = locals.lang
  const featuredPackages = await getFeaturedPackages({ lang })

  return { lang, featuredPackages }
}) satisfies PageServerLoad
