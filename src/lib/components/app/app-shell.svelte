<script lang="ts">
  import { fly } from 'svelte/transition'
  import UiShell from '$core/components/shell/ui-shell.svelte'

  export let href: string
</script>

<UiShell>
  {#key href}
    <div
      class="app-shell focusable-ring"
      in:fly={{ y: -200, duration: 300, delay: 300 }}
      out:fly={{ y: -200, duration: 300 }}>
      <slot />
    </div>
  {/key}
</UiShell>

<style lang="postcss">
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    isolation: isolate;
  }
</style>
