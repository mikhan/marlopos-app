import { json } from '@sveltejs/kit'
import { getPackage } from '$lib/database/packages'
import { LANGUAGES } from '$lib/utils/language'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const data = await getPackage({ id: '5ea3a926-26fb-4549-acc0-44d06007e065', language: LANGUAGES.es })
  return json(data)
}
