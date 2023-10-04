<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let icon: IconDefinition
  export let title: string
  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let disabled = false
  export let tabindex: number | null = null
  export let size: 'sm' | 'md' | 'lg' = 'md'
</script>

<button {...$$restProps} on:click {title} {type} {disabled} {tabindex} data-size={size} data-component="ui-icon-button">
  <Fa {icon} />
</button>

<style lang="postcss">
  button {
    display: grid;
    place-content: center;
    width: theme('spacing.10');
    aspect-ratio: 1/1;
    flex: 0 0 auto;
    border-radius: 100%;
    @apply focusable focusable-ring;

    &[data-size='sm'] {
      width: theme('spacing.6');
    }

    &[data-size='lg'] {
      width: theme('spacing.14');
    }

    &[disabled] {
      cursor: not-allowed;
    }
  }
</style>
