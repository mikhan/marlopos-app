<script lang="ts">
  import DOMPurify from 'isomorphic-dompurify'

  export let html = ''
</script>

<div>
  {@html DOMPurify.sanitize(html, { ALLOWED_TAGS: ['p', 'li', 'a'] })}
</div>

<style lang="postcss">
  div :global(p) {
    line-height: theme('lineHeight.relaxed');
  }

  div :global(p:not(:first-child)) {
    margin-top: 1lh;
  }

  div :global(a[href]) {
    @apply link;
  }
</style>
