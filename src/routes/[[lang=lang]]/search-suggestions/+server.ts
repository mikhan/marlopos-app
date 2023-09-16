import { json } from '@sveltejs/kit'
import { packagesIndexProvider } from '$lib/database/document-index-providers/packages'
import { addDocumentIndexProvider, getSuggestions } from '$lib/services/search'
import { getLanguage } from '$lib/utils/language'
import type { RequestHandler } from './$types'

addDocumentIndexProvider(packagesIndexProvider)

export const GET: RequestHandler = async ({ url, params }) => {
  const language = getLanguage(params.lang)
  const query = url.searchParams.get('q')
  let result: string[] = []

  if (query) {
    result = (await getSuggestions(query, { language })).map(({ suggestion }) => suggestion)
  }

  return json(result)
}
