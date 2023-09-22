<script lang="ts">
  import type { PackageSearchResult } from './packages'

  export let data: PackageSearchResult[]
</script>

<div class="flex flex-col gap-4">
  <h2 class="text-lg font-bold">Paquetes</h2>
  <ul class="flex flex-col gap-4">
    {#each data as result}
      <li>
        <div class="max-w-screen-md">
          <a class="link" href={result.href}>{result.title}</a>
          <div class="line-clamp-2">{result.description}</div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  li {
  }
</style>
