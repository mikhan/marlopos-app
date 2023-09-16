<h2 {...$$restProps}>
  <slot />
</h2>

<style lang="postcss">
  h2 {
    font-size: theme('fontSize.2xl-fluid[0]');
    line-height: theme('fontSize.2xl-fluid[1]');
    font-weight: theme('fontWeight.thin');
  }
</style>
