export function groupBy<T>(items: Iterable<T>, callbackFn: (element: T, index: number) => string) {
  return Array.from(items).reduce((object, element, index) => {
    const key = callbackFn(element, index)
    object[key] = (object[key] ?? []).concat(element)
    return object
  }, Object.create(null) as Record<string, T[]>)
}
