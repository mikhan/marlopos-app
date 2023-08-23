<h2 {...$$restProps}>
  <slot />
</h2>

<style lang="scss">
  h2 {
    font-size: theme('fontSize.2xl');
    line-height: theme('lineHeight.relaxed');
    text-align: center;
    font-family: theme('fontFamily.serif');
  }
</style>
