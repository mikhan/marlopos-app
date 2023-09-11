import { json } from '@sveltejs/kit'
import { packagesIndexProvider } from '$lib/database/document-index-providers/packages'
import { type Suggestion, addDocumentIndexProvider, getSuggestions } from '$lib/services/search'
import { getLanguage } from '$lib/utils/language'
import type { RequestHandler } from './$types'

addDocumentIndexProvider(packagesIndexProvider)

export const GET: RequestHandler = async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const query = url.searchParams.get('q')
  let result: Suggestion[] = []

  if (query) {
    result = await getSuggestions(query, { language })
  }

  return json(result)
}
