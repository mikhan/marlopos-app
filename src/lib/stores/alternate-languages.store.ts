import { derived } from 'svelte/store'
import { metadataStore } from './metadata.store'

function getAlternateLanguages(links: Api.Link[]): Api.LinkAlternate[] {
  return links.filter((link): link is Api.LinkAlternate => link.rel === 'alternate')
}

export const alternateLanguagesStore = derived(
  metadataStore,
  (metadata) => {
    return metadata ? getAlternateLanguages(metadata.links) : []
  },
  [],
)
