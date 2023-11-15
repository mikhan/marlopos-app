import type { Action } from 'svelte/action'

export const zIndex: Action<HTMLElement, number> = (element, index) => {
  let prevIndex: number

  const update = (newIndex: number) => {
    let zIndex: string | null

    if (newIndex === 1) zIndex = '2'
    else if (prevIndex === 1) zIndex = '1'
    else zIndex = null

    prevIndex = newIndex
    element.style.setProperty('z-index', zIndex)
  }

  update(index)

  return { update }
}
