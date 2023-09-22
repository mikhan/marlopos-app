<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte'
  import { groupBy } from '$core/utils/object'
  import PackageResult from '$lib/database/document-index-providers/package-result.svelte'
  import type { SearchResult } from '$lib/services/search'

  export let results: SearchResult[]
  const components: Record<string, ComponentType<SvelteComponent>> = {
    package: PackageResult,
  }

  $: index = groupBy(results, (result) => result.type)

  function getComponent(type: string) {
    const component = components[type]

    if (!component) throw new Error(`Unknown search type '${type}'`)

    return component
  }
</script>

{#each Object.entries(index) as [type, results]}
  <svelte:component this={getComponent(type)} data={results} />
{:else}
  <div>No hay resultados</div>
{/each}
