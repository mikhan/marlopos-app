<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte'
  import type { SearchResult } from '$lib/services/search'

  export let components: Record<string, ComponentType<SvelteComponent<{ data: SearchResult }>>>
  export let results: SearchResult[]

  function getComponent(type: string) {
    const component = components[type]

    if (!component) throw new Error(`Unknown search type '${type}'`)

    return component
  }
</script>

{#each results as data}
  <svelte:component this={getComponent(data.type)} {data} />
{/each}
