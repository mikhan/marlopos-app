export function getFocusableElements(node: Element): HTMLElement[] {
  return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
}
