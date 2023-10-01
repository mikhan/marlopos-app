import type { Action } from 'svelte/action'
import { cubicOut } from 'svelte/easing'
import { type Tweened, tweened } from 'svelte/motion'
import { overrideProperties } from '$core/services/element'
import { clamp } from '$core/utils/math'

export type MousescrollEvent = CustomEvent<{
  top: number
  left: number
  position: Tweened<{ top: number; left: number }>
}>

type MouseScrollOptions = {
  speed?: number
}

type MouseScrollAttributes = {
  'on:mousescrollstart': (event: MousescrollEvent) => void
  'on:mousescrollend': (event: MousescrollEvent) => void
}

export const mousescroll: Action<HTMLElement, MouseScrollOptions | undefined, MouseScrollAttributes> = (
  element,
  { speed = 250 } = {},
) => {
  const abortController = new AbortController()
  const position = tweened({ top: 0, left: 0 }, { duration: speed, easing: cubicOut })
  const unsubscribe = position.subscribe((position) => element.scrollTo(position))
  let top = 0
  let left = 0

  element.addEventListener('pointerdown', onPointerdown, { signal: abortController.signal })

  function dispatch(name: string) {
    const event: MousescrollEvent = new CustomEvent(name, { detail: { top, left, position } })
    element.dispatchEvent(event)
  }

  function onPointerdown() {
    const maxWidth = element.scrollWidth - element.clientWidth
    const maxHeight = element.scrollHeight - element.clientHeight
    let restoreProperties: (() => void) | undefined
    let restoreDocumentProperties: (() => void) | undefined
    let updateTask = Promise.resolve()
    top = element.scrollTop
    left = element.scrollLeft
    position.set({ top, left }, { duration: 0 })

    window.addEventListener('pointermove', onPointermove, { signal: abortController.signal })
    window.addEventListener('pointerup', onPointerup, { signal: abortController.signal })
    dispatch('mousescrollstart')

    function onPointermove(event: PointerEvent) {
      event.preventDefault()

      if (!restoreProperties) {
        restoreProperties = overrideProperties(element, {
          'scroll-snap-type': 'none',
          'scroll-behavior': 'auto',
        })
        restoreDocumentProperties = overrideProperties(document.documentElement, {
          'pointer-events': 'none',
          'cursor': 'grab',
        })
      }

      top = clamp(0, maxHeight, top - event.movementY)
      left = clamp(0, maxWidth, left - event.movementX)
      updateTask = position.set({ top, left }, { duration: speed })
    }

    async function onPointerup() {
      window.removeEventListener('pointermove', onPointermove)
      window.removeEventListener('pointerup', onPointerup)
      restoreProperties?.()
      restoreDocumentProperties?.()
      await updateTask
      dispatch('mousescrollend')
    }
  }

  return {
    destroy() {
      unsubscribe()
      abortController.abort()
    },
  }
}
