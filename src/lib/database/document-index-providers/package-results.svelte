<script lang="ts">
  import { getOmniboxContext } from '$lib/components/search/omnibox.svelte'
  import type { PackageSearchResult } from './packages'

  export let data: PackageSearchResult[]

  const { registerOptionElement, selected } = getOmniboxContext()
</script>

<div>
  <div class="p-4 text-sm font-bold">PAQUETES</div>
  {#each data as result (result.href)}
    <a class:selected={$selected?.getAttribute('href') === result.href} href={result.href} use:registerOptionElement>
      <img
        class="rounded shrink-0"
        src={result.cover.src}
        width={result.cover.width}
        height={result.cover.height}
        alt="" />
      <div class="overflow-hidden">
        <div class="font-bold truncate">{result.title}</div>

        <div class="text-sm truncate opacity-75">{result.description}</div>
      </div>
    </a>
  {/each}
</div>

<style lang="postcss">
  a {
    display: flex;
    align-items: center;
    gap: theme('spacing.4');
    cursor: pointer;
    padding: theme('spacing.1') theme('spacing.4');

    &:hover,
    &.selected {
      background-color: theme('colors.surface-primary.bg');
      color: theme('colors.surface-primary.fg');
    }
  }
</style>
