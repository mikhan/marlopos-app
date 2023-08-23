<button>
  <slot />
</button>

<style lang="scss">
  button {
    display: grid;
    place-content: center;
    background: theme('colors.neutral.200');
    color: theme('colors.neutral.200-fg');
  }
</style>
