<script lang="ts">
  export let data: Api.CalendarEntry
</script>

<a href="/">
  <div class="font-bold leading-tight line-clamp-2">{data.name}</div>
  <div class="text-sm truncate">{data.description}</div>
</a>

<style lang="postcss">
  a {
    display: block;
    padding: theme('spacing.4') theme('spacing.2');
    overflow: hidden;
    @apply focusable focusable-ring focusable-inner;

    &:hover {
      background-color: theme('colors.surface-primary.bg');
      color: theme('colors.surface-primary.fg');
    }
  }
</style>
