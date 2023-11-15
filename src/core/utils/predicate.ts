import { origin } from '$core/constants/location'

export function isAbsoluteURL(url: URL | string): boolean {
  return /^https?:\/\//i.test(url.toString())
}

export function isExternalURL(url: URL | string): boolean {
  return isAbsoluteURL(url) && url.toString().startsWith(origin)
}
