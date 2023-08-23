import { assertIsNonNullable } from '$core/utils/assert'
import { getStaticMapURL } from '$lib/services/map'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, params, fetch }) => {
  const [lon, lat] = params.coordinates.split(',').map((s) => Number.parseFloat(s))

  assertIsNonNullable(lon)
  assertIsNonNullable(lat)

  const zoom = Number(url.searchParams.get('zoom'))
  const width = Number(url.searchParams.get('width'))
  const height = Number(url.searchParams.get('height'))

  const mapUrl = getStaticMapURL({
    lon,
    lat,
    zoom,
    width,
    height,
    marker: { label: 'circle', color: '5a34d5', size: 'large' },
  })

  return fetch(mapUrl.toString())
}
