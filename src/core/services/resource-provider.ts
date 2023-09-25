export interface ResourceProvider {
  transform: (url: URL) => URL
}

let resourceProvider: ResourceProvider = { transform: (url) => url }

export function setResourceProvider(provider: ResourceProvider): void {
  resourceProvider = provider
}

export function getResourceProvider(): ResourceProvider {
  return resourceProvider
}

export function transformURL(url: URL): URL {
  return resourceProvider.transform(url)
}

export type getResourceURLOptions = {
  width?: number
  height?: number
  aspectRatio?: string
  quality?: number
  name?: string
}

export function getResourceURL(origin: string, filename: string, options: getResourceURLOptions = {}): URL {
  if (options.name) {
    const name = encodeURIComponent(options.name.replace(/ /g, '-'))
    filename = filename.replace(/([^/.]+)\.(.+)$/, (_, filename, ext) => `seo/${filename}/${name}.${ext}`)
  }

  const url = new URL(`/api/assets/${filename}`, origin)

  if (options.width) url.searchParams.set('w', String(options.width))
  if (options.height) url.searchParams.set('h', String(options.height))
  if (options.aspectRatio) url.searchParams.set('ar', options.aspectRatio)
  if (options.quality) url.searchParams.set('q', String(options.quality))

  return url
}

export function getResourceHref(filename: string, options: getResourceURLOptions = {}): string {
  const origin = 'http://localhost'
  const url = getResourceURL(origin, filename, options)

  return url.href.substring(origin.length)
}
