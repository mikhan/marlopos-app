<script lang="ts">
  import type { PageData } from './$types'
  import FeaturedPackages from '$lib/packages/components/featured-packages.svelte'

  export let data: PageData
</script>

<h1>Language: {data.lang}</h1>

<FeaturedPackages packages={data.featuredPackages} />
