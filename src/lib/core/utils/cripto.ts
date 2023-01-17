export function simpleHash(string: string): string {
  const l = string.length
  let h = 0
  let i = 0

  while (i < l) {
    h = ((h << 5) - h + string.charCodeAt(i++)) | 0
  }

  return h.toString(36)
}
