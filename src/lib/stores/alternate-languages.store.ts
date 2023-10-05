import { derived } from 'svelte/store'
import { metadataStore } from './metadata.store'

function getAlternateLanguages(links: App.Link[]): App.LinkAlternate[] {
  return links.filter((link): link is App.LinkAlternate => link.rel === 'alternate')
}

export const alternateLanguagesStore = derived(
  metadataStore,
  (metadata) => {
    return metadata ? getAlternateLanguages(metadata.links) : []
  },
  [],
)
