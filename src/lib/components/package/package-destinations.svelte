<script lang="ts">
  import PackageDestination from './package-destination.svelte'
  import PackageMap from './package-map.svelte'

  export let data: Api.Destination[]
  let packageMap: PackageMap
</script>

<div class="mt-4 flex flex-col px-4 gap-2 md:grid md:grid-cols-[1fr,1fr] md:gap-4 md:px-8">
  <ul
    class="flex flex-col gap-2 md:gap-4 md:ml-auto md:max-w-prose"
    role="tablist"
    aria-labelledby="destinations-list-header">
    {#each data as destination}
      <PackageDestination data={destination} {packageMap} />
    {/each}
  </ul>
  <div
    class="focusable-within aspect-video sm:w-full sm:h-full max-h-[calc(100vh-64px-32px)] md:sticky md:top-20 md:max-w-prose bg-surface-1-bg border border-surface-1-border rounded-2xl overflow-clip elevation-low">
    <PackageMap class="w-full h-full" {data} bind:this={packageMap} />
  </div>
</div>
