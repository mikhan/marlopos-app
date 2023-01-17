import { clamp, mod } from '$lib/core/utils/math'
import { writable } from 'svelte/store'

export type Options = {
  initialIndex?: number
  wrap?: boolean
}

export function createIndexLoop(size: number, { initialIndex, wrap }: Options = {}) {
  let currentIndex = initialIndex ?? 0
  const { subscribe, set } = writable<number>(currentIndex)
  const update = (index: number) => set((currentIndex = index))

  return {
    get currentIndex() {
      return currentIndex
    },
    get size() {
      return size
    },
    first: () => update(0),
    last: () => update(size - 1),
    previous: () => update(calculateIndex(currentIndex - 1, size, wrap)),
    next: () => update(calculateIndex(currentIndex + 1, size, wrap)),
    set: (index: number) => update(calculateIndex(index, size, wrap)),
    subscribe,
  }
}

function calculateIndex(index: number, size: number, wrap = false): number {
  if (index === 0 || size === 0) return 0

  return wrap ? mod(index, size) : clamp(0, size - 1, index)
}
