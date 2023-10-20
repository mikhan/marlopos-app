<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'

  export let source: string
</script>

<div>
  <SvelteMarkdown {source} />
  <slot />
</div>

<style lang="postcss">
  div {
    display: contents;

    :global() {
    }

    :global(p) {
      line-height: theme('lineHeight.relaxed');
    }

    :global(p:not(:first-child)) {
      margin-top: 1rem;
    }

    :global(a[href]) {
      @apply link;
    }
  }
</style>
