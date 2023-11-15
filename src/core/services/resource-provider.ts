export interface ResourceProvider {
  transform: (path: URL | string) => string
}

let resourceProvider: ResourceProvider = { transform: (path) => (typeof path === 'string' ? path : path.href) }

export function setResourceProvider(provider: ResourceProvider): void {
  resourceProvider = provider
}

export function getResourceProvider(): ResourceProvider {
  return resourceProvider
}

export function transformURL(path: URL | string): string {
  return resourceProvider.transform(path)
}

export type ResourceURLOptions = {
  [key: string]: string | number
  w?: number
  h?: number
  ar?: string
  q?: number
  name?: string
}

function getResourceURL(origin: string, filename: string, options: ResourceURLOptions = {}): URL {
  // if (options.name) {
  //   const name = encodeURIComponent(options.name.replace(/ /g, '-'))
  //   filename = filename.replace(/([^/.]+)\.(.+)$/, (_, filename, ext) => `seo/${filename}/${name}.${ext}`)
  // }

  const url = new URL(`/api/assets/${filename}`, origin)

  for (const [key, value] of Object.entries(options)) {
    // if (key === 'name') continue
    if (key === 'width') url.searchParams.set('w', String(value))
    else if (key === 'height') url.searchParams.set('h', String(value))
    else if (key === 'aspectRatio') url.searchParams.set('ar', String(value))
    else if (key === 'quality') url.searchParams.set('q', String(value))
    else url.searchParams.set(key, String(value))
  }

  return url
}

export function getResourceHref(path: string, options: ResourceURLOptions = {}): string {
  const origin = 'http://localhost'
  const url = getResourceURL(origin, path, options)

  return url.href.substring(origin.length)
}
