import { json } from '@sveltejs/kit'
import { getSuggestions } from '$lib/services/search'
import { getLanguage } from '$lib/utils/language'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const query = url.searchParams.get('q')
  let result: string[] = []

  if (query) {
    result = await getSuggestions(query, { language })
  }

  return json(result)
}
