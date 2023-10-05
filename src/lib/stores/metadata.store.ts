import { writable } from 'svelte/store'

export const metadataStore = writable<App.Metadata | null>(null)
