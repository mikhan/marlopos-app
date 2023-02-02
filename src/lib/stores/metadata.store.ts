import { writable } from 'svelte/store'

export const metadataStore = writable<Api.Metadata | null>(null)
