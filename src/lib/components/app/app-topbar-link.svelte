<script lang="ts">
  import { page } from '$app/stores'

  export let href: string

  $: active = $page.url.pathname.includes(href)
</script>

<a class="uppercase truncate" class:active {href}><slot /></a>

<style lang="postcss">
  a {
    display: grid;
    place-content: center;
    height: 100%;
    padding: 0 theme('spacing.1');
    transition: color 250ms;
    position: relative;
    font-weight: bold;
    font-size: theme('fontSize.sm[0]');
    line-height: theme('fontSize.sm[1]');
    @apply focusable-visible focusable-ring focusable-inner;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: currentColor;
      scale: 100% 0;
      transition: scale 250ms;
      bottom: 0;
    }

    &:hover {
      opacity: 1;

      &::before {
        scale: 100% 100%;
      }
    }

    &.active {
      color: theme('colors.link');

      &::before {
        scale: 100% 100%;
      }
    }
  }
</style>
