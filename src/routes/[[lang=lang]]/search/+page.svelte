<script lang="ts">
  import { page } from '$app/stores'
  import AppContent from '$lib/components/app/app-content.svelte'
  import Search from '$lib/components/search/search.svelte'

  $: query = $page.url.searchParams.get('q') ?? ''
</script>

<AppContent className="gap-y-8 max-w-screen-2xl mx-auto">
  <Search {query} />
</AppContent>
