<script lang="ts">
  import { fly } from 'svelte/transition'

  export let pageId: string
</script>

{#key pageId}
  <div
    class="h-full grow focusable-ring"
    in:fly={{ y: -200, duration: 300, delay: 300 }}
    out:fly={{ y: -200, duration: 300 }}>
    <slot />
  </div>
{/key}
