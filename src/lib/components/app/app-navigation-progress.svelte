<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  let isNavigating = false
  beforeNavigate(({ willUnload }) => (isNavigating = !willUnload))
  afterNavigate(() => (isNavigating = false))
</script>

{#if isNavigating}
  <progress {...$$restProps} />
{/if}

<style lang="postcss">
  progress {
    --progress-background-color: transparent;
    --progress-color: theme('colors.ring');
    display: block;
    appearance: none;
    background-color: var(--progress-background-color);
    width: 100%;
    height: 4px;

    &::-webkit-progress-bar {
      background: none;
    }

    &:indeterminate {
      animation: progress-indeterminate 1s linear infinite;
      background-image: linear-gradient(to right, var(--progress-color) 30%, var(--progress-background-color) 30%);
      background-position: 0% 0%;
      background-size: 150% 150%;
      background-repeat: no-repeat;
      background-color: var(--progress-background-color);
    }
  }

  @keyframes progress-indeterminate {
    from {
      background-position: 200% 0;
    }

    to {
      background-position: -200% 0;
    }
  }
</style>
