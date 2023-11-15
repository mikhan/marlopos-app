<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import Link from './link.svelte'

  export let source: string
</script>

<SvelteMarkdown {source} renderers={{ link: Link }} />
