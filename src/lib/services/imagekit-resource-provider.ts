import type { ResourceProvider } from '$core/services/resource-provider'

export class ImagekitResourceProvider implements ResourceProvider {
  constructor(readonly endpoint: string) {}

  transform(url: URL) {
    const q = Number.parseInt(url.searchParams.get('q') ?? '') || undefined
    const { width: w, height: h } = getSize(
      url.searchParams.get('w'),
      url.searchParams.get('h'),
      url.searchParams.get('ar'),
    )

    const newURL = new URL(url)
    newURL.pathname = newURL.pathname.replace(/^\/api\/assets\//, '/')

    if (newURL.pathname.startsWith('/seo/')) {
      newURL.pathname = newURL.pathname.replace(/^\/seo\//, '/')
      newURL.pathname = newURL.pathname.replace(/(?<=.)\/[^/]+(?=\.[a-z]+$)/, '')
    }

    const pathParams = Object.entries({ w, h, q })
      .filter(([, value]) => typeof value !== 'undefined' && value !== null)
      .map(([key, value]) => `${key}-${value}`)
      .join(',')

    if (pathParams.length) {
      newURL.pathname = `/tr:${pathParams}` + newURL.pathname
    }

    for (const param of ['w', 'h', 'ar', 'q']) {
      newURL.searchParams.delete(param)
    }

    return new URL(newURL.href.replace(newURL.origin + '/', this.endpoint))
  }
}

function getSize(w: string | null, h: string | null, ar: string | null): { width?: number; height?: number } {
  const width = Number.parseInt(w ?? '')
  const height = Number.parseInt(h ?? '')

  if (!Number.isFinite(width)) return {}

  if (Number.isFinite(height)) {
    return { width, height }
  } else if (ar && /^\d+-\d+$/.test(ar)) {
    const [arw, arh] = ar.split('-').map((n) => Number.parseInt(n)) as [number, number]

    return { width, height: Math.round((width * arh) / arw) }
  } else {
    return { width }
  }
}
