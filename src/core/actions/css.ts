export function css(node: HTMLElement, properties: Record<string, string | number>) {
  function setProperties() {
    for (const prop of Object.keys(properties)) {
      node.style.setProperty(`--${prop}`, String(properties[prop]))
    }
  }

  setProperties()

  return {
    update(newProperties: Record<string, string | number>) {
      properties = newProperties
      setProperties()
    },
  }
}
