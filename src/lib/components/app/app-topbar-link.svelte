<script lang="ts">
  import { page } from '$app/stores'

  export let href: string

  $: current = $page.url.pathname.includes(href)
</script>

<a class="uppercase truncate" aria-current={current ? 'page' : null} {href}><slot /></a>

<style lang="postcss">
  a {
    display: grid;
    place-content: center start;
    height: theme('spacing.12');
    padding: 0 theme('spacing.4');
    transition: color 250ms;
    position: relative;
    font-weight: bold;
    font-size: theme('fontSize.sm[0]');
    line-height: theme('fontSize.sm[1]');
    @apply focusable-visible focusable-ring focusable-inner;

    @media (min-width: theme('screens.md')) {
      height: 100%;
      place-content: center;
      padding: 0 theme('spacing.1');
    }

    &::before {
      content: '';
      width: 4px;
      height: 100%;
      position: absolute;
      inset: 0 auto 0 0;
      background-color: currentColor;
      transform: scale(0);
      transition: transform 150ms;

      @media (min-width: theme('screens.md')) {
        width: 100%;
        height: 4px;
        inset: auto 0 0 0;
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
