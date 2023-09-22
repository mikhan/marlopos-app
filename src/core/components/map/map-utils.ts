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

const isLangField = /^name_/
const isTokenField = /^\{name/
const supportedLanguages = [
  'ar',
  'de',
  'en',
  'es',
  'fr',
  'it',
  'ja',
  'ko',
  'mul',
  'pt',
  'ru',
  'vi',
  'zh-Hans',
  'zh-Hant',
]

export function setMapLanguage(style: mapboxgl.Style, language: string) {
  if (supportedLanguages.indexOf(language) < 0) throw new Error(`Language ${language} is not supported`)
  const streetsSource = findStreetsSource(style)
  if (!streetsSource) return style

  const field = language === 'mul' ? 'name' : `name_${language}`
  const changedLayers = style.layers.map((layer) => {
    if ('source' in layer && layer.source === streetsSource) return changeLayerTextProperty(layer, field)
    return layer
  })

  return Object.assign({}, style, {
    layers: changedLayers,
  })
}

function findStreetsSource(style: mapboxgl.Style) {
  const sources = Object.keys(style.sources).filter((sourceName) => {
    const source = style.sources[sourceName]
    const url = source && 'url' in source && source.url
    return url && (url.indexOf('mapbox.mapbox-streets-v8') > -1 || /mapbox-streets-v[1-9][1-9]/.test(url))
  })

  if (!sources.length)
    throw new Error(
      'If using MapboxLanguage with a Mapbox style, the style must be based on vector tile version 8, e.g. "streets-v11"',
    )

  return sources[0]
}

function changeLayerTextProperty(layer: mapboxgl.AnyLayer, languageFieldName: string) {
  if ('layout' in layer && layer.layout && 'text-field' in layer.layout) {
    return Object.assign({}, layer, {
      layout: Object.assign({}, layer.layout, {
        'text-field': adaptPropertyLanguage(layer.layout['text-field'], languageFieldName),
      }),
    })
  }
  return layer
}

function adaptPropertyLanguage(property: unknown, languageFieldName: string) {
  if (isFlatExpressionField(property)) {
    property[1] = languageFieldName
  }

  adaptNestedExpressionField(property, languageFieldName)

  if (Array.isArray(property) && property[0] === 'get' && property[1] === 'name') {
    const defaultProp = property.slice()
    const adaptedProp = ['get', languageFieldName]
    property = ['coalesce', adaptedProp, defaultProp]
  }

  return property
}

function adaptNestedExpressionField(property: unknown, languageFieldName: string) {
  if (Array.isArray(property)) {
    for (let i = 1; i < property.length; i++) {
      if (Array.isArray(property[i])) {
        if (isFlatExpressionField(property[i])) {
          property[i][1] = languageFieldName
        }
        adaptNestedExpressionField(property[i], languageFieldName)
      }
    }
  }
}

function isFlatExpressionField(property: unknown): property is mapboxgl.Expression {
  const isGetExpression = Array.isArray(property) && property[0] === 'get'
  if (isGetExpression && isTokenField.test(property[1])) {
    console.warn(
      'This plugin no longer supports the use of token syntax (e.g. {name}). Please use a get expression. See https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/ for more details.',
    )
  }

  return isGetExpression && isLangField.test(property[1])
}
