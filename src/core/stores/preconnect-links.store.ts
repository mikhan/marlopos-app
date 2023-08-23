import { writable, type Readable } from 'svelte/store'

export interface PreconnectLink {
  href: string
}

export interface PreconnectLinksContext extends Readable<Record<string, PreconnectLink>> {
  addOrigin(src: string): void
}

export const PreconnectLinksContext = Symbol('PreconnectLinksContext')

export function createPreconnectLinksStore(): PreconnectLinksContext {
  const { subscribe, update } = writable<Record<string, PreconnectLink>>({})

  return {
    subscribe,
    addOrigin(src: string) {
      update((links) => {
        const origin = new URL(src).origin

        if (!(origin in links)) {
          links[origin] = { href: origin }
        }

        return { ...links }
      })
    },
  }
}
