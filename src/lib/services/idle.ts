export const requestIdleCallback =
  globalThis.requestIdleCallback ||
  function (cb: IdleRequestCallback) {
    const start = Date.now()

    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1)
  }

export const cancelIdleCallback =
  globalThis.cancelIdleCallback ||
  function (id) {
    clearTimeout(id)
  }
