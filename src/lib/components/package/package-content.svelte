<script lang="ts">
  import type { Api } from '$lib/api'
  import DynamicContent from '../common/dynamic-content.svelte'
  import Prose from '../common/prose.svelte'

  export let data: Api.Package
</script>

<div class="px-4 grow-1">
  <Prose>
    <DynamicContent source={data.content} />
  </Prose>
</div>

<style lang="postcss">
  div {
    box-shadow: theme('elevation.low');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-1.bg');
    padding: theme('spacing.4');
    color: theme('colors.surface-1.fg');

    @media (min-width: theme('screens.lg')) {
      padding-inline: theme('spacing.6');
    }
  }
</style>
