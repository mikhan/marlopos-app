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
