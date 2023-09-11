import type { Action } from 'svelte/action'

export type Move = { x: number; y: number; movementX: number; movementY: number }

export type MoveEvent = CustomEvent<Move> & {
  currentTarget: EventTarget & HTMLDivElement
}

type Attributes = {
  'on:movestart': (event: MoveEvent) => void
  'on:move': (event: MoveEvent) => void
  'on:moveend': (event: MoveEvent) => void
}

export const draggable: Action<HTMLElement, undefined, Attributes> = (element) => {
  let abortController: AbortController | undefined
  let moving = false
  let movementX = 0
  let movementY = 0
  let x = 0
  let y = 0

  function dispatch(name: string) {
    const newEvent = new CustomEvent(name, { detail: { x, y, movementX, movementY } }) as MoveEvent
    element.dispatchEvent(newEvent)
  }

  function onMouseDown(event: MouseEvent) {
    event.preventDefault()
    x = y = movementX = movementY = 0
    abortController?.abort()
    abortController = new AbortController()
    window.addEventListener('mousemove', onMouseMove, { signal: abortController.signal })
    window.addEventListener('mouseup', onMouseUp, { signal: abortController.signal })
  }

  function onMouseMove(event: MouseEvent) {
    event.preventDefault()
    movementX = event.movementX
    movementY = event.movementY
    x += movementX
    y += movementY

    if (!moving) {
      dispatch('movestart')
      moving = true
    }

    dispatch('move')
  }

  function onMouseUp(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (moving) {
      dispatch('moveend')
      moving = false
    }

    abortController?.abort()
  }

  element.addEventListener('mousedown', onMouseDown)
}
