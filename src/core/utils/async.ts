export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(() => requestIdleCallback(resolve), ms))
}

export function debounce<T extends unknown[]>(fnc: (...args: T) => unknown, timeout: number) {
  let timer: NodeJS.Timeout
  return (...args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => fnc(...args), timeout)
  }
}
