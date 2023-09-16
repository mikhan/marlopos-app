let i = 0

export function generateUID(prefix = 'id') {
  const id = Date.now() + ++i
  return `${prefix}-${id.toString(36)}`
}
