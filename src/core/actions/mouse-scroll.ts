import type { Action } from 'svelte/action'
import { cubicOut } from 'svelte/easing'
import { tweened } from 'svelte/motion'
import { clamp } from '$core/utils/math'

export const mouseScroll: Action<HTMLElement> = (element) => {
  const abortController = new AbortController()
  element.addEventListener('pointerdown', onPointerdown, { signal: abortController.signal })
  const properties = [
    ['pointer-events', 'none'],
    ['scroll-snap-type', 'none'],
    ['scroll-behavior', 'auto'],
    ['cursor', 'grab'],
  ] as [string, string][]

  function onPointerdown() {
    const maxWidth = element.scrollWidth - element.clientWidth
    const maxHeight = element.scrollHeight - element.clientHeight
    let propertiesBackup: [string, string][] | undefined
    let top = element.scrollTop
    let left = element.scrollLeft

    const position = tweened({ top, left }, { duration: 250, easing: cubicOut })
    position.subscribe((position) => element.scrollTo(position))

    window.addEventListener('pointermove', onPointermove, { signal: abortController.signal })
    window.addEventListener('pointerup', onPointerup, { signal: abortController.signal })

    function onPointermove(event: PointerEvent) {
      event.preventDefault()

      if (!propertiesBackup) {
        propertiesBackup = properties.map(([key]) => [key, element.style.getPropertyValue(key)])
        properties.forEach(([key, val]) => element.style.setProperty(key, val))
      }

      top = clamp(0, maxHeight, top - event.movementY)
      left = clamp(0, maxWidth, left - event.movementX)
      position.set({ top, left })
    }

    function onPointerup() {
      propertiesBackup?.forEach(([key, val]) => element.style.setProperty(key, val))
      window.removeEventListener('pointermove', onPointermove)
      window.removeEventListener('pointerup', onPointerup)
    }
  }

  return {
    destroy: () => abortController.abort(),
  }
}
