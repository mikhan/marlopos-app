export function isAbsoluteURL(url: string): boolean {
  return /^[a-z]+:\/\//.test(url)
}
