export function coerceToNumber(string: unknown): number | undefined {
  if (typeof string !== 'string') return

  const value = Number.parseInt(string)

  return Number.isFinite(value) ? value : undefined
}
