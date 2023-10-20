<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import type { Api } from '$lib/api'
  import Prose from '../common/prose.svelte'

  export let data: Api.Package
</script>

<div class="max-w-screen-md px-4 grow-1">
  <Prose>
    <SvelteMarkdown source={data.content} />
  </Prose>
</div>

<style lang="postcss">
  div {
    padding: theme('spacing.4');
    border-radius: theme('borderRadius.DEFAULT');
    box-shadow: theme('elevation.low');
    background-color: theme('colors.surface-1.bg');
    color: theme('colors.surface-1.fg');

    @media (min-width: theme('screens.lg')) {
      padding-inline: theme('spacing.6');
    }
  }
</style>
