import { json } from '@sveltejs/kit'
import { getBanners } from '$lib/database/banners'
import { LANGUAGES } from '$lib/utils/language'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const data = await getBanners({ language: LANGUAGES.es })
  return json(data)
}
