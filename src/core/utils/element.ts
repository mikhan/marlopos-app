let i = 0

export function generateUID() {
  const id = Date.now() + ++i
  return `id-${id.toString(36)}`
}
