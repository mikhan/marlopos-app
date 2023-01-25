<script lang="ts">
  import '@fontsource/merriweather'
  import '@fontsource/noto-sans'
  import '../../app.scss'
</script>

<svelte:head>
  <title>Viajes Marlopos</title>
  <meta name="description" content="Agencia de viajes Marlopos" />
</svelte:head>

<slot />

<style lang="scss" global>
  :root {
    color-scheme: dark;
  }

  body {
    --app_surface_color: theme('colors.neutral.100');
    font-family: theme('fontFamily.sans');
    background-color: var(--app_surface_color);
    color: theme('colors.neutral.900');
  }
</style>
