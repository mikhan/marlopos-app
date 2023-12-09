let i = 0

export function generateUID(prefix = 'id') {
  const id = Date.now() + ++i
  return `${prefix}-${id.toString(36)}`
}

export function documentPositionSorter(a: Node, b: Node) {
  if (a === b) return 0

  const position = a.compareDocumentPosition(b)

  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1
  } else if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1
  } else {
    return 0
  }
}
