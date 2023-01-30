import { writable } from 'svelte/store'

interface LayoutStore {
  topbar: { height: number }
}

export const layoutStore = writable<LayoutStore>({
  topbar: { height: 64 },
})
