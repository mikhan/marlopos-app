export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(() => requestIdleCallback(resolve), ms))
}
