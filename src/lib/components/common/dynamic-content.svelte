<script lang="ts">
  export let html: string = ''
</script>

<div>
  {@html html}
</div>

<style lang="postcss">
  div :global(p) {
    line-height: theme('lineHeight.relaxed');
  }

  div :global(p:not(:first-child)) {
    margin-top: 1lh;
  }

  div :global(a[href]) {
    color: theme('colors.primary.200');

    &:hover {
      text-decoration: underline;
    }
  }
</style>
