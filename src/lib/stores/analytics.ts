import { type Readable, writable } from 'svelte/store'

type Command = { command: keyof Gtag.GtagCommands; args: Gtag.GtagCommands[keyof Gtag.GtagCommands] }

const store = writable<Command | undefined>(undefined)

export const analytics: {
  [K in keyof Gtag.GtagCommands]: (...args: Gtag.GtagCommands[K]) => void
} & Readable<Command | undefined> = {
  config(...args) {
    store.set({ command: 'config', args })
  },
  set(...args) {
    store.set({ command: 'set', args })
  },
  js(...args) {
    store.set({ command: 'js', args })
  },
  event(...args) {
    store.set({ command: 'event', args })
  },
  get(...args) {
    store.set({ command: 'get', args })
  },
  consent(...args) {
    store.set({ command: 'consent', args })
  },
  subscribe: store.subscribe,
}
