<script lang="ts">
  export let html: string = ''
</script>

<div>
  {@html html}
</div>

<style>
  div :global(p) {
    margin: theme('spacing.4') 0;
    line-height: theme('lineHeight.relaxed');
  }
</style>
