<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte'
  import { groupBy } from '$core/utils/object'
  import DestinationResults from '$lib/database/document-index-providers/destination-results.svelte'
  import PackageResults from '$lib/database/document-index-providers/package-results.svelte'
  import type { SearchResult } from '$lib/services/search'

  export let results: SearchResult[]

  const components: Record<string, ComponentType<SvelteComponent>> = {
    package: PackageResults,
    destination: DestinationResults,
  }

  let index: [string, SearchResult[]][]

  $: index = Object.entries(groupBy(results, (result) => result.type))

  function getComponent(type: string): ComponentType<SvelteComponent> {
    const component = components[type]

    if (!component) throw new Error(`Unknown search type '${type}'`)

    return component
  }
</script>

<div class="results">
  {#each index as [type, results]}
    <svelte:component this={getComponent(type)} data={results} />
  {:else}
    <div class="px-4">No hay resultados</div>
  {/each}
</div>

<style lang="postcss">
  .results {
    border-top: 1px solid theme('colors.surface-2.border');
    padding-block: theme('spacing.2');
    overflow-y: auto;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
    @apply scrollbar-thin scrollbar-surface-2-fg;
  }
</style>
