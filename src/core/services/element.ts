export function overrideProperties(element: HTMLElement, properties: Record<string, string>): () => void {
  const backup = Object.entries(properties).map(([key]) => [key, element.style.getPropertyValue(key)] as const)
  Object.entries(properties).forEach(([key, val]) => element.style.setProperty(key, val))

  return () => backup.forEach(([key, val]) => element.style.setProperty(key, val))
}
