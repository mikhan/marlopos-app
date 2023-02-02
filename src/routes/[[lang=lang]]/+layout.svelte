<script lang="ts">
  // import { PUBLIC_TAWK_WIDGET_SCRIPT_SRC } from '$env/static/public'
  import '@fontsource/merriweather'
  import '@fontsource/noto-sans'
  import '../../app.scss'
  import AppMetadata from '$lib/components/app-metadata.svelte'
  import AppShell from '$lib/components/app-shell.svelte'
  // import Chat from '$lib/components/chat.svelte'
</script>

<AppMetadata />
<AppShell><slot /></AppShell>

<!-- <Chat src={PUBLIC_TAWK_WIDGET_SCRIPT_SRC} /> -->
<style lang="scss">
  :global(body) {
    --app_surface_color: theme('colors.neutral.100');
    font-family: theme('fontFamily.sans');
    background-color: var(--app_surface_color);
    color: theme('colors.neutral.900');
  }
</style>
