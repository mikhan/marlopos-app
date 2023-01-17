<script lang="ts">
  import type { PageData } from './$types'
  import Featured from '$lib/components/featured.svelte'

  export let data: PageData
</script>

<Featured items={data.featuredPackages}></Featured>
