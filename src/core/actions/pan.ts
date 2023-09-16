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

  function onPointerDown(event: PointerEvent) {
    x = startX = event.screenX
    y = startY = event.screenY
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
    abortController.signal.onabort = () => node.style.removeProperty('pointer-events')
    document.body.addEventListener('pointermove', onPointerMove, { signal: abortController.signal })
    document.body.addEventListener('pointerup', onPointerUp, { signal: abortController.signal })
    window.addEventListener('scroll', onPointerUp, { signal: abortController.signal })
  }

  function onPointerMove(event: PointerEvent) {
    event.preventDefault()
    node.style.setProperty('pointer-events', 'none')
    x = event.screenX
    y = event.screenY
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
      document.body.removeEventListener('pointermove', onPointerMove)
    }
  }

  function onPointerUp() {
    abortController?.abort()
    node.dispatchEvent(new CustomEvent('panstop', { detail: { x, y, deltaX, deltaY, directionX, directionY } }))
  }

  node.addEventListener('pointerdown', onPointerDown)

  return {
    destroy: () => node.removeEventListener('pointerdown', onPointerDown),
  }
}
