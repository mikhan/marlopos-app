<script lang="ts">
  import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { getOmniboxContext } from '$lib/components/search/omnibox.svelte'
  import type { DestinationSearchResult } from './destinations'

  export let data: DestinationSearchResult[]

  const { registerOptionElement, selected } = getOmniboxContext()
</script>

<div>
  <div class="p-4 text-sm font-bold">DESTINOS</div>
  {#each data as result (result.href)}
    <a class:selected={$selected?.getAttribute('href') === result.href} href={result.href} use:registerOptionElement>
      <Fa icon={faLocationDot} fw />
      <div class="truncate">
        <span class="font-bold">{result.title}</span>, {result.country.name}
      </div>
    </a>
  {/each}
</div>

<style lang="postcss">
  a {
    display: flex;
    align-items: center;
    gap: theme('spacing.2');
    cursor: pointer;
    padding: theme('spacing.1') theme('spacing.4');

    &:hover,
    &.selected {
      background-color: theme('colors.surface-primary.bg');
      color: theme('colors.surface-primary.fg');
    }
  }
</style>
