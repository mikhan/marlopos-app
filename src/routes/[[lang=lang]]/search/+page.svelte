<script lang="ts">
  import Search from '$lib/components/search/search.svelte'
  import PackageResult from '$lib/database/document-index-providers/package-result.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const components = {
    package: PackageResult,
  }
</script>

<a href="#hash">Hash</a>
<Search results={data.searchResults} {components} />
<pre class="whitespace-pre-wrap"><code>{JSON.stringify(data.searchResults, null, 2)}</code></pre>

<style lang="postcss">
</style>
