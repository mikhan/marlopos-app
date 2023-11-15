import { dev } from '$app/environment'
import type { ResourceProvider } from '$core/services/resource-provider'

export class ImagekitResourceProvider implements ResourceProvider {
  readonly endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint.replace(/\/$/, '')
  }

  transform(path: URL | string): string {
    const url = new URL(path, 'http://localhost')
    const q = getQuality(url.searchParams.get('q'))
    const fo = getFocus(url.searchParams.get('fo'))
    const name = url.searchParams.get('name')
    const { width: w, height: h } = getSize(
      url.searchParams.get('w'),
      url.searchParams.get('h'),
      url.searchParams.get('ar'),
    )

    const newURL = new URL(url)
    newURL.pathname = newURL.pathname.replace(/^\/api\/assets\//, '/')

    let pathParams = Object.entries({ w, h, q, fo })
      .filter(([, value]) => typeof value !== 'undefined' && value !== null)
      .map(([key, value]) => `${key}-${value}`)
      .join(',')

    const minWidth = 16
    const maxWidth = 256
    if (dev && w && w >= minWidth) {
      const scale = Math.min(1, easeInQuad((w - minWidth) * (1 / (maxWidth - minWidth))))
      const fontSize = Math.round(scaleBetween(8, 14, scale))
      const padding = Math.round(scaleBetween(1, 4, scale))
      const borderRadius = w >= 30 ? Math.round(2 + 2 * scale) : 'max'
      const text = encodeURIComponent(btoa(w + (h && w >= 30 ? `x${h}` : '')))

      pathParams += `,l-text,ie-${text},fs-${fontSize},pa-${padding},r-${borderRadius},tg-b,ff-roboto,co-black,bg-ffffff75,l-end`
    }

    if (pathParams.length) {
      newURL.pathname = `/tr:${pathParams}` + newURL.pathname
    }

    if (name) {
      newURL.pathname = setName(newURL.pathname, name)
    }

    for (const param of ['w', 'h', 'ar', 'q', 'fo', 'name']) {
      newURL.searchParams.delete(param)
    }

    return newURL.href.replace(newURL.origin, this.endpoint)
  }
}

function scaleBetween(min: number, max: number, scale: number) {
  return min + (max - min) * scale
}

function easeInQuad(x: number): number {
  return x * x
}

function setName(path: string, name: string) {
  name = encodeURIComponent(name.replace(/ /g, '-'))

  return path.replace(/\/([^.]+)(.*)$/, (_, path, ext) => `/ik-seo/${path}/${name}${ext}`)
}

function getQuality(q: string | null): number | undefined {
  return Number.parseInt(q ?? '') || undefined
}

function getFocus(fo: string | null): string | undefined {
  const valid = [
    'center',
    'top',
    'left',
    'bottom',
    'right',
    'top_left',
    'top_right',
    'bottom_left',
    'bottom_right',
    'auto',
    'face',
  ]

  return fo && valid.includes(fo) ? fo : undefined
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
