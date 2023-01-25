<script lang="ts">
  let y: number
  const height = 100
  const minOpacity = 0
  const maxOpacity = 1

  $: opacity = minOpacity + (maxOpacity - minOpacity) * Math.min(y / height, 1)
</script>

<svelte:window bind:scrollY={y} />

<nav style:--opacity={opacity}>
  <slot />
</nav>

<style lang="scss">
  nav {
    --opacity: 0;
    display: flex;
    align-items: center;
    height: theme('spacing.16');
    margin-bottom: calc(theme('spacing.16') * -1);
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 0 theme('spacing.4');
    background-image: linear-gradient(to bottom, theme('colors.primary.100 / 75%'), transparent);

    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background-color: theme('colors.primary.500 / 50%');
      background-clip: content-box;
      border-bottom: 1px solid theme('colors.primary.600 / 50%');
      backdrop-filter: saturate(50%) blur(4px);
      opacity: var(--opacity);
      z-index: -1;
    }
  }
</style>
