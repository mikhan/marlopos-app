<script lang="ts">
  export let title: string
  export let description: string
</script>

<header class="_header">
  <div class="_background">
    <slot name="background" />
  </div>
  <div class="_content">
    <h1 class="_title _text">{title}</h1>
    <p class="_description _text">
      {description}
    </p>
    <div class="_toolbar">
      <slot name="toolbar" />
    </div>
  </div>
</header>

<style lang="postcss">
  ._header {
    display: grid;
    position: relative;
    align-items: end;
    isolation: isolate;
    height: 54rem;
    max-height: 100svh;
  }

  ._content {
    display: grid;
    grid-template-columns: minmax(min-content, theme('screens.md'));
    z-index: 1;
    margin-inline: auto;
    padding-inline: calc(var(--layout-padding) + theme('spacing.4'));
    padding-block-end: max(10vh, theme('spacing.12'));
    width: 100%;
    max-width: theme('screens.lg');
  }

  ._background {
    position: absolute;
    inset: 0;
  }

  ._title {
    font-size: theme('fontSize.4xl-fluid[0]');
    line-height: theme('lineHeight.normal');
    font-family: theme('fontFamily.display');
    @apply line-clamp-2;
  }

  ._description {
    font-size: theme('fontSize.xl[0]');
    line-height: theme('fontSize.xl[1]');
    @apply line-clamp-3;
  }

  ._text {
    color: theme('colors.surface-2.fg');
    text-shadow: 0 0 4px theme('colors.canvas.bg'), 0 0 6px theme('colors.canvas.bg / 75%'),
      0 0 32px theme('colors.canvas.bg / 75%');
    text-wrap: balance;
  }

  ._toolbar {
    margin-block-start: theme('spacing.8');
    height: theme('spacing.12');
  }
</style>
