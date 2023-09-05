<script lang="ts">
  import type { PageData } from './$types'
  import Package from '$lib/components/package/package.svelte'

  export let data: PageData
</script>

<Package data={data.page} />
