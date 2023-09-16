<script lang="ts">
  import type { SearchResult } from '$lib/services/search'

  export let data: SearchResult
</script>

<div>
  <div>{data.title}</div>
  <div>{data.description}</div>
</div>
