<script lang="ts">
  import type { PackageSearchResult } from './packages'

  export let data: PackageSearchResult[]
</script>

<div class="py-4 text-lg font-bold">Paquetes</div>
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

<style lang="postcss">
  li {
  }
</style>
