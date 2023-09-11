export function isAbsoluteURL<T extends URL | string>(url: T): boolean {
  return /^https?:\/\//i.test(url.toString())
}
