import type { Action } from 'svelte/action'

type DropCallback = (event: DragEvent) => void

export function createDragAndDrop() {
  const dragTargets = new Set<{ target: HTMLElement; callback: DropCallback }>()
  let dragEndController: AbortController

  function onDragStart(event: DragEvent) {
    dragEndController = new AbortController()

    for (const { target, callback } of dragTargets) {
      target.addEventListener('dragenter', (event) => callback(event), {
        signal: dragEndController.signal,
      })
    }

    const img = new Image()
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
    event.dataTransfer?.setDragImage(img, 0, 0)
  }

  function onDragEnd() {
    dragEndController?.abort()
  }

  const drag: Action<HTMLElement> = (target: HTMLElement) => {
    target.addEventListener('dragstart', (e) => onDragStart(e))
    target.addEventListener('dragend', () => onDragEnd())
  }

  const drop: Action<HTMLElement, DropCallback> = (target: HTMLElement, callback: DropCallback) => {
    const dragTarget = { target, callback }
    dragTargets.add(dragTarget)

    return {
      destroy: () => dragTargets.delete(dragTarget),
    }
  }

  return { drag, drop }
}
