import { API_TOKEN, API_URL } from '$env/static/private'
import type { RequestHandler } from './$types'

const headers = new Headers({ Authorization: `Bearer ${API_TOKEN}` })

export const GET: RequestHandler = async ({ fetch, params, url }) => {
  const requestUrl = new URL(`${API_URL}/assets/${params.id}`)

  const key = url.searchParams.get('key')
  if (key) requestUrl.searchParams.set('key', key)

  return fetch(requestUrl, { headers })
}
