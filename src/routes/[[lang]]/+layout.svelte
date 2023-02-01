<script lang="ts">
  import AppShell from '$lib/components/app-shell.svelte'
  import Chat from '$lib/components/chat.svelte'
  import { languageStore } from '$lib/stores/language-store'
  import { PUBLIC_TAWK_WIDGET_SCRIPT_SRC } from '$env/static/public'
  import type { LayoutData } from './$types'
  import '@fontsource/merriweather'
  import '@fontsource/noto-sans'
  import '../../app.scss'

  export let data: LayoutData

  $: languageStore.set(data.language)
</script>

<svelte:head>
  <title>Viajes Marlopos</title>
  <meta name="description" content="Agencia de viajes Marlopos" />
</svelte:head>

<AppShell><slot /></AppShell>
<Chat src={PUBLIC_TAWK_WIDGET_SCRIPT_SRC} />

<style lang="scss" global>
  body {
    --app_surface_color: theme('colors.neutral.100');
    font-family: theme('fontFamily.sans');
    background-color: var(--app_surface_color);
    color: theme('colors.neutral.900');
  }
</style>
