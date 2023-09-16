import { getResourceProvider } from '$core/services/resource-provider'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, fetch, request }) => {
  const resourceProvider = getResourceProvider()
  const newURL = resourceProvider.transform(url)
  if (newURL.toString() === url.toString()) throw new Error('Same url')

  const headers = new Headers()
  const accept = request.headers.get('accept')
  if (accept) headers.set('accept', accept)

  return fetch(new Request(newURL, { headers }))
}
