import type { Action } from 'svelte/action'

export type PanEvent = CustomEvent<{
  x: number
  y: number
  deltaX: number
  deltaY: number
  directionX: 'left' | 'right' | ''
  directionY: 'top' | 'bottom' | ''
}>

export const panning: Action<
  HTMLElement,
  undefined,
  {
    'on:panstart': (event: PanEvent) => void
    'on:panmove': (event: PanEvent) => void
    'on:panstop': (event: PanEvent) => void
  }
> = (node) => {
  let startX = 0
  let startY = 0
  let x = 0
  let y = 0
  let deltaX = 0
  let deltaY = 0
  let directionX = ''
  let directionY = ''
  let abortController: AbortController | undefined

  function onPointerDown(event: TouchEvent) {
    const touch = event.touches[0]
    if (!touch) return
    x = startX = touch.screenX
    y = startY = touch.screenY
    deltaX = 0
    deltaY = 0
    directionX = ''
    directionY = ''

    const panStartEvent = new CustomEvent('panstart', {
      detail: { x, y, deltaX, deltaY, directionX, directionY },
      cancelable: true,
    })
    node.dispatchEvent(panStartEvent)

    if (panStartEvent.defaultPrevented) return

    abortController?.abort()
    abortController = new AbortController()
    // abortController.signal.onabort = () => node.style.removeProperty('pointer-events')
    window.addEventListener('touchmove', onPointerMove, { signal: abortController.signal })
    window.addEventListener('touchend', onPointerUp, { signal: abortController.signal })
    // window.addEventListener('scroll', onPointerUp, { signal: abortController.signal })
  }

  function onPointerMove(event: TouchEvent) {
    const touch = event.touches[0]
    if (!touch) return

    // node.style.setProperty('pointer-events', 'none')
    x = touch.screenX
    y = touch.screenY
    deltaX = x - startX
    deltaY = y - startY
    directionX = x > startX ? 'right' : 'left'
    directionY = y > startY ? 'bottom' : 'top'

    const panMoveEvent = new CustomEvent('panmove', {
      detail: { x, y, deltaX, deltaY, directionX, directionY },
      cancelable: true,
    })
    node.dispatchEvent(panMoveEvent)
    if (panMoveEvent.defaultPrevented) {
      abortController?.abort()
    }
  }

  function onPointerUp() {
    abortController?.abort()
    node.dispatchEvent(new CustomEvent('panstop', { detail: { x, y, deltaX, deltaY, directionX, directionY } }))
  }

  node.addEventListener('touchstart', onPointerDown, { passive: true })

  return {
    destroy: () => node.removeEventListener('touchstart', onPointerDown),
  }
}
