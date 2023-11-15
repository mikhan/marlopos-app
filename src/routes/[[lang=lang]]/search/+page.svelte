<script lang="ts">
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import AppContent from '$lib/components/app/app-content.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import Search from '$lib/components/search/search.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  let query = ''

  onMount(() => {
    query = $page.url.searchParams.get('q') ?? ''
  })
</script>

<AppContent class="mx-auto gap-y-8 max-w-screen-2xl">
  <Search {query} />
  <AppFooter data={data.information} />
</AppContent>
