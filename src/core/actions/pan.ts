import type { Action } from 'svelte/action'

export type PanEvent = CustomEvent<{
  x: number
  y: number
  deltaX: number
  deltaY: number
  directionX: 'left' | 'right' | ''
  directionY: 'top' | 'bottom' | ''
}>

type Attributes = {
  'on:panstart': (event: PanEvent) => void
  'on:panmove': (event: PanEvent) => void
  'on:panstop': (event: PanEvent) => void
}

export const panning: Action<HTMLElement, undefined, Attributes> = (element) => {
  let startX = 0
  let startY = 0
  let x = 0
  let y = 0
  let deltaX = 0
  let deltaY = 0
  let directionX = ''
  let directionY = ''
  let abortController = new AbortController()
  let panning = false

  element.addEventListener('touchstart', onTouchstart, { passive: true })

  function onTouchstart() {
    abortController.abort()
    abortController = new AbortController()
    window.addEventListener('touchmove', onTouchmove, { signal: abortController.signal })
    window.addEventListener('touchend', onTouchend, { signal: abortController.signal })
  }

  function onTouchmove(event: TouchEvent) {
    const touch = event.touches[0]
    if (!touch) return

    if (!panning) {
      panning = true
      x = startX = touch.screenX
      y = startY = touch.screenY
      deltaX = 0
      deltaY = 0
      directionX = ''
      directionY = ''

      abortController.signal.addEventListener('abort', () => (panning = false))

      if (!dispatchEvent('panstart', true)) {
        onTouchend()
      }
    } else {
      x = touch.screenX
      y = touch.screenY
      deltaX = x - startX
      deltaY = y - startY
      directionX = x > startX ? 'right' : 'left'
      directionY = y > startY ? 'bottom' : 'top'

      if (!dispatchEvent('panmove', true)) {
        onTouchend()
      }
    }
  }

  function onTouchend() {
    abortController.abort()
    dispatchEvent('panstop', false)
  }

  function dispatchEvent(name: string, cancelable: boolean) {
    return element.dispatchEvent(
      new CustomEvent(name, {
        detail: { x, y, deltaX, deltaY, directionX, directionY },
        cancelable,
      }),
    )
  }

  return {
    destroy: () => abortController.abort(),
  }
}
