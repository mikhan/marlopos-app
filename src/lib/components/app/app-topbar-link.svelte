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
    padding: 0 theme('spacing.4');
    opacity: 0.5;
    transition: opacity 250ms;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: currentColor;
      translate: 0 -100%;
      transition: translate 250ms;
      top: 0;
    }

    &.active {
      opacity: 1;

      &::before {
        translate: 0 0;
      }
    }

    &:hover {
      opacity: 1;
    }
  }
</style>
