import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals, url }) => {
  const redirectUrl = url.href.replace(url.origin, `${url.origin}/${locals.lang}`)

  throw redirect(308, redirectUrl)
}) satisfies PageServerLoad
