<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>{data.content}</h1>

<pre class="whitespace-pre-wrap"><code>{JSON.stringify(data, null, 2)}</code></pre>
 