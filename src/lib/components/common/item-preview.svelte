<script lang="ts">
  export let dominantColor: string | null = null
</script>

<div class="wrapper" style:--dominant-color={dominantColor}>
  <div class="image">
    <slot name="image" />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    --is-hover: 0;
    --color: theme('colors.surface-1.fg');
    --dominant-color: transparent;
    display: grid;
    position: relative;
    place-content: flex-end stretch;
    overflow: hidden;

    &:is(:hover, :focus-within) {
      --is-hover: 1;
      --color: theme('colors.primary.500-fg');
    }
  }

  .image {
    position: absolute;
    inset: 0;
    isolation: isolate;

    &::after {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to top, var(--dominant-color) 1rem, 5rem, transparent 8rem);
      content: '';
    }
  }

  .content {
    transition: color 250ms ease-in-out;
    isolation: isolate;
    color: var(--color);

    &::before,
    &::after {
      position: absolute;
      z-index: -1;
      transition: opacity 250ms ease-in-out;
      inset: 0;
      content: '';
    }

    &::before {
      opacity: calc(var(--is-hover) + 1);
      background-image: linear-gradient(to top, theme('colors.surface-1.bg / 50%'), 4rem, transparent 12rem),
        linear-gradient(45deg, theme('colors.surface-1.bg / 75%'), 2rem, transparent 12rem);
    }

    &::after {
      opacity: var(--is-hover);
      background-image: linear-gradient(
        to top,
        theme('colors.primary.700 / 90%'),
        3rem,
        theme('colors.primary.700 / 50%') 12rem
      );
    }
  }
</style>
