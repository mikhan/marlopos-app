import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE, PUBLIC_MAPBOX_USER } from '$env/static/public'

type CreateMarkerOptions = {
  lon: number
  lat: number
  label?: string
  size?: 'small' | 'large'
  color?: string
}

type CreateMapOptions = {
  width: number
  height: number
  lon: number
  lat: number
  zoom: number
  marker?: Omit<CreateMarkerOptions, 'lat' | 'lon'>
}

export function getStaticMapURL({ lon, lat, zoom, width, height, marker }: CreateMapOptions) {
  let href = `https://api.mapbox.com/styles/v1/${PUBLIC_MAPBOX_USER}/${PUBLIC_MAPBOX_STYLE}/static`

  if (marker) href += `/${createMarker({ lon, lat, ...marker })}`

  return new URL(`${href}/${lon},${lat},${zoom}/${width}x${height}?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}`)
}

function createMarker({ lon, lat, label, size = 'small', color }: CreateMarkerOptions) {
  let marker = size === 'small' ? 'pin-s' : 'pin-l'

  if (label) marker += `-${label}`
  if (color) marker += `+${color}`

  return `${marker}(${lon},${lat})`
}
