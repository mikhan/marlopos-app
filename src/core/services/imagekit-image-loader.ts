import { setImageLoader, type ImageLoaderConfig } from './image-loader'

type Transformations = Record<string, string | undefined>

function decodeTransformations(parameters: string | null): Transformations {
  if (!parameters) return {}

  const transformations: Transformations = {}

  for (const param of parameters.split(',')) {
    const [key, value] = param.split('-') as [string, string | undefined]
    transformations[key] = value
  }

  return transformations
}

function encodeTransformations(transformations: Transformations): string {
  const parameters: string[] = []

  for (const [key, value] of Object.entries(transformations)) {
    if (typeof value === 'string') parameters.push(`${key}-${value}`)
  }

  return parameters.length ? `tr:${parameters.join(',')}/` : ''
}

const PLACEHOLDER = '__TRANSFORM__/'
function imageKitLoader(path: string, config: ImageLoaderConfig) {
  if (config.src.startsWith('http')) return config.src

  const url = new URL(config.src.replace(/^(\/)?/, `$1${PLACEHOLDER}`), path)
  const transformations = decodeTransformations(url.searchParams.get('tr'))

  transformations['w'] = config.width?.toString()
  transformations['q'] ??= 'auto'

  url.pathname = url.pathname.replace(PLACEHOLDER, encodeTransformations(transformations))
  url.searchParams.delete('tr')

  return url.toString()
}

export function provideImageKitLoader(path: string) {
  setImageLoader((config) => imageKitLoader(path, config))
}
