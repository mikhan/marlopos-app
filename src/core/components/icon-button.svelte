<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let icon: IconDefinition
  export let title: string
  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let disabled = false
  export let tabindex: number | null = null
</script>

<button {...$$restProps} on:click {title} {type} {disabled} {tabindex}>
  <Fa {icon} />
</button>

<style lang="postcss">
  button {
    display: grid;
    place-content: center;
    width: theme('spacing.6');
    height: theme('spacing.6');
    flex: 0 0 auto;
    border-radius: 100%;
    @apply focusable focusable-ring;
  }
</style>
