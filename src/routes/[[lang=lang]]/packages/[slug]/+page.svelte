<script lang="ts">
  import { metadataStore } from '$lib/stores/metadata.store'
  import type { PageData } from './$types'

  export let data: PageData

  $: metadataStore.set(data.meta)
</script>

<h1>{data.content}</h1>

<pre class="whitespace-pre-wrap text-sm"><code>{JSON.stringify(data, null, 2)}</code></pre>
