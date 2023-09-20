import { assertIsNonNullable } from '$core/utils/assert'
import { getStaticMapURL } from '$lib/services/map'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, params, fetch }) => {
  const [lon, lat] = params.coordinates.split(',').map((s) => Number.parseFloat(s))

  assertIsNonNullable(lon)
  assertIsNonNullable(lat)

  const zoom = Number(url.searchParams.get('z'))
  const width = Number(url.searchParams.get('w'))
  const height = Number(url.searchParams.get('h'))

  const mapUrl = getStaticMapURL({
    lon,
    lat,
    zoom,
    width,
    height,
    marker: { label: 'circle', color: '8471b1' },
  })

  return fetch(mapUrl.toString())
}
