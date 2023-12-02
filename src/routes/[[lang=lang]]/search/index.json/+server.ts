import { json } from '@sveltejs/kit'
import { getSearchIndex } from '$lib/services/search'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = async ({ locals }) => {
  const searchIndex = await getSearchIndex({ locale: locals.lang.locale })

  return json(searchIndex)
}
