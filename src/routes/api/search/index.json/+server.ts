import { json } from '@sveltejs/kit'
import { getSearchIndex } from '$lib/services/search'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const searchIndex = await getSearchIndex()

  return json(searchIndex)
}

export const prerender = true
