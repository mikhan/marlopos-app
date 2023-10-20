<script lang="ts">
  import type { Api } from '$lib/api'
  import Prose from '../common/prose.svelte'

  export let data: Api.Package
</script>

{#if data.notes}
  <Prose>
    <blockquote>{data.notes}</blockquote>
  </Prose>
{/if}
