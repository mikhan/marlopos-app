import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE, MAPBOX_USER } from '$env/static/private'

type CreateMarkerOptions = {
  lon: number
  lat: number
  label?: string
  size?: 'small' | 'large'
  color?: string
}

type CreateMapOptions = {
  lon: number
  lat: number
  zoom: number
  width: number
  height: number
  marker?: Omit<CreateMarkerOptions, 'lat' | 'lon'>
}

export function getStaticMap({ lon, lat, zoom, width, height, marker }: CreateMapOptions) {
  let href = `https://api.mapbox.com/styles/v1/${MAPBOX_USER}/${MAPBOX_STYLE}/static`

  if (marker) href += `/${createMarker({ lon, lat, ...marker })}`

  return `${href}/${lon},${lat},${zoom}/${width}x${height}?access_token=${MAPBOX_ACCESS_TOKEN}`
}

function createMarker({ lon, lat, label, size = 'small', color }: CreateMarkerOptions) {
  let marker = size === 'small' ? 'pin-s' : 'pin-l'

  if (label) marker += `-${label}`
  if (color) marker += `+${color}`

  return `${marker}(${lon},${lat})`
}
