import type { Map } from 'mapbox-gl'

export type MapControlAction = (map: Map) => ((map: Map) => void) | void

export type MapControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type MapBoundingBox = [[lng: number, lat: number], [lng: number, lat: number]]

export function getBoundingBox(points: [lng: number, lat: number][], { padding = 0.2 }: { padding?: number } = {}) {
  const boundingBox: MapBoundingBox = points.reduce<[[number, number], [number, number]]>(
    ([min, max], [lng, lat]) => {
      if (lng < min[0]) min[0] = lng
      if (lng > max[0]) max[0] = lng
      if (lat < min[1]) min[1] = lat
      if (lat > max[1]) max[1] = lat

      return [min, max]
    },
    [
      [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    ],
  )

  const lngDiff = (boundingBox[1][0] - boundingBox[0][0]) * (padding / 2)
  const latDiff = (boundingBox[1][1] - boundingBox[0][1]) * (padding / 2)
  boundingBox[0][0] -= lngDiff
  boundingBox[1][0] += lngDiff
  boundingBox[0][1] -= latDiff
  boundingBox[1][1] += latDiff

  return boundingBox
}

export const isGeolocationEnabled = () => 'navigator' in globalThis && 'geolocation' in globalThis.navigator

export async function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  if (!isGeolocationEnabled()) throw new Error('Geolocation is not enabled')

  return new Promise((resolve, reject) => {
    const onSuccess = (position: GeolocationPosition) => resolve(position)
    const onError = (positionError: GeolocationPositionError) => reject(positionError)
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
  })
}
