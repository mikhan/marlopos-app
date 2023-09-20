<script lang="ts">
  import AppContent from '$lib/components/app/app-content.svelte'
  import Search from '$lib/components/search/search.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<AppContent className="gap-y-8 max-w-screen-2xl mx-auto" pageId={data.href}>
  <Search results={data.searchResults} />
</AppContent>
<!-- <pre class="whitespace-pre-wrap"><code>{JSON.stringify(data.searchResults, null, 2)}</code></pre> -->
