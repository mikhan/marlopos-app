import { json } from '@sveltejs/kit'
import { getFeatured } from '$lib/database/featured'
import { DEFAULT_LANGUAGE } from '$lib/utils/language'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  return json(await getFeatured({ language: DEFAULT_LANGUAGE }))
}
