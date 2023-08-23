import { PUBLIC_IMAGE_CDN_ENDPOINT } from '$env/static/public'
import type { RequestHandler } from './$types'

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

function getImageKitURL(url: URL) {
  const q = Number.parseInt(url.searchParams.get('q') ?? '') || undefined
  const { width: w, height: h } = getSize(
    url.searchParams.get('w'),
    url.searchParams.get('h'),
    url.searchParams.get('ar'),
  )

  const pathParams = Object.entries({ w, h, q })
    .filter(([, value]) => typeof value !== 'undefined')
    .map(([key, value]) => `${key}-${value}`)
    .join(',')

  const newURL = new URL(url)
  newURL.pathname = newURL.pathname.replace(/^\/api\/assets\//, '/')

  if (newURL.pathname.startsWith('/seo/')) {
    newURL.pathname = newURL.pathname.replace(/^\/seo\//, '/')
    newURL.pathname = newURL.pathname.replace(/(?<=.)\/[^/]+(?=\.[a-z]+$)/, '')
  }

  if (pathParams) {
    newURL.pathname = `/tr:${pathParams}` + newURL.pathname
  }

  return new URL(newURL.href.replace(newURL.origin + '/', PUBLIC_IMAGE_CDN_ENDPOINT))
}

export const GET: RequestHandler = async ({ url, fetch }) => {
  return fetch(getImageKitURL(url))
}
