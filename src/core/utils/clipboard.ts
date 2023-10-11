export function writeToClipboard(value: string) {
  return navigator.clipboard.writeText(value)
}
