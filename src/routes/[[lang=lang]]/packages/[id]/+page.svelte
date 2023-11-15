<script lang="ts">
  import AppContent from '$lib/components/app/app-content.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import Package from '$lib/components/package/package.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<AppContent class="gap-8 mx-auto max-w-screen-2xl">
  <Package data={data.page} />
  <AppFooter data={data.information} />
</AppContent>
