import type { Map } from 'mapbox-gl'

export type MapControlAction = (map: Map) => ((map: Map) => void) | void

export type MapControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type MapBoundingBox = [{ lng: number; lat: number }, { lng: number; lat: number }]

export function getBoundingBox(points: { lng: number; lat: number }[], { padding = 0.2 }: { padding?: number } = {}) {
  const boundingBox: MapBoundingBox = points.reduce<[{ lng: number; lat: number }, { lng: number; lat: number }]>(
    ([min, max], { lng, lat }) => {
      if (lng < min.lng) min.lng = lng
      if (lng > max.lng) max.lng = lng
      if (lat < min.lat) min.lat = lat
      if (lat > max.lat) max.lat = lat

      return [min, max]
    },
    [
      { lng: Number.MAX_SAFE_INTEGER, lat: Number.MAX_SAFE_INTEGER },
      { lng: Number.MIN_SAFE_INTEGER, lat: Number.MIN_SAFE_INTEGER },
    ],
  )

  const lngDiff = (boundingBox[1].lng - boundingBox[0].lng) * (padding / 2)
  const latDiff = (boundingBox[1].lat - boundingBox[0].lat) * (padding / 2)
  boundingBox[0].lng -= lngDiff
  boundingBox[1].lng += lngDiff
  boundingBox[0].lat -= latDiff
  boundingBox[1].lat += latDiff

  return boundingBox
}
