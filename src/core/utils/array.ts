export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function sortNumberArray(a: number, b: number) {
  return a > b ? 1 : a < b ? -1 : 0
}
