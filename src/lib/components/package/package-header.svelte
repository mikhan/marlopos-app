<script lang="ts">
  import type { Api } from '$lib/api'

  export let data: Api.Package
</script>

<header class="text-center max-w-prose text-shadow sm:text-start">
  <h1>{data.name}</h1>
  <p>{data.description}</p>
</header>

<style lang="postcss">
  h1 {
    font-size: theme('fontSize.4xl-fluid[0]');
    line-height: theme('fontSize.4xl-fluid[1]');
    font-family: theme('fontFamily.display');
    text-wrap: balance;
    max-width: theme('maxWidth.prose');
    text-shadow: 0 0 4px theme('colors.canvas.bg');
  }

  p {
    margin-top: theme('spacing.2');
    font-size: theme('fontSize.xl[0]');
    line-height: theme('fontSize.xl[1]');
    text-wrap: balance;
    max-width: theme('maxWidth.prose');
    text-shadow: 0 0 4px theme('colors.canvas.bg');
  }
</style>
