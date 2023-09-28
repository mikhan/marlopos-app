import { writable } from 'svelte/store'
import type { Api } from '$lib/api'

export const metadataStore = writable<Api.Metadata | null>(null)
