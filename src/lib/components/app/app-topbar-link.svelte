<script lang="ts">
  import { page } from '$app/stores'

  export let href: string

  $: current = $page.url.pathname.includes(href)
</script>

<a class="uppercase truncate" aria-current={current ? 'page' : null} {href}><slot /></a>

<style lang="postcss">
  a {
    display: grid;
    position: relative;
    place-content: center start;
    transition: color 250ms;
    padding: 0 theme('spacing.4');
    height: theme('spacing.12');
    font-weight: bold;
    font-size: theme('fontSize.sm[0]');
    line-height: theme('fontSize.sm[1]');
    @apply focusable-visible focusable-ring focusable-inner;

    @media (min-width: theme('screens.md')) {
      place-content: center;
      padding: 0 theme('spacing.1');
      height: 100%;
    }

    &::before {
      position: absolute;
      transform: scale(0);
      transition: transform 150ms;
      inset: 0 auto 0 0;
      background-color: currentColor;
      width: 4px;
      height: 100%;
      content: '';

      @media (min-width: theme('screens.md')) {
        inset: auto 0 0 0;
        width: 100%;
        height: 4px;
      }
    }

    &:hover {
      opacity: 1;

      &::before {
        transform: scale(1);
      }
    }

    &[aria-current='page'] {
      color: theme('colors.link');

      &::before {
        transform: scale(1);
      }
    }
  }
</style>
