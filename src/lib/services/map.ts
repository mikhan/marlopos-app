import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE, PUBLIC_MAPBOX_USER } from '$env/static/public'
import type { MapBoundingBox } from '$core/components/map/map-utils'

export type CreateMarkerOptions = {
  lon: number
  lat: number
  label?: string
  size?: 'small' | 'large'
  color?: string
}

export type CreateMapOptions = {
  width: number
  height: number
  markers?: CreateMarkerOptions[]
  padding?: number | number[]
  center:
    | {
        lon: number
        lat: number
        zoom: number
      }
    | MapBoundingBox
    | 'auto'
}

export function getStaticMapURL({ center, width, height, padding, markers }: CreateMapOptions) {
  const url = new URL(`https://api.mapbox.com/styles/v1/${PUBLIC_MAPBOX_USER}/${PUBLIC_MAPBOX_STYLE}/static`)

  if (markers?.length) {
    url.pathname += '/' + markers.map(createMarker).join(',')
  }

  if (center === 'auto') {
    url.pathname += `/auto`
  } else if (Array.isArray(center)) {
    url.pathname += `/[${center.flat().join(',')}]`
  } else {
    url.pathname += `/${center.lon},${center.lat},${center.zoom}`
  }

  url.pathname += `/${width}x${height}`

  url.searchParams.set('access_token', PUBLIC_MAPBOX_ACCESS_TOKEN)
  url.searchParams.set('logo', 'false')
  url.searchParams.set('attribution', 'false')

  if (padding && (center === 'auto' || Array.isArray(center))) {
    url.searchParams.set('padding', typeof padding === 'number' ? String(padding) : padding.join(','))
  }

  return url
}

function createMarker({ lon, lat, label, size = 'small', color }: CreateMarkerOptions) {
  let marker = size === 'small' ? 'pin-s' : 'pin-l'

  if (label) marker += `-${label}`
  if (color) marker += `+${color}`

  return `${marker}(${lon},${lat})`
}
