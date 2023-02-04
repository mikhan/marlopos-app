<script lang="ts">
  import { PUBLIC_TAWK_WIDGET_SCRIPT_SRC } from '$env/static/public'
  import AppMetadata from '$lib/components/app-metadata.svelte'
  import AppShell from '$lib/components/app-shell.svelte'
  import AppTopbar from '$lib/components/app-topbar.svelte'
  import AppFooter from '$lib/components/app-footer.svelte'
  import Chat from '$lib/components/chat.svelte'
  import { dev } from '$app/environment'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<AppMetadata />

<AppShell>
  <AppTopbar />
  <slot />
  <AppFooter data={data.information} />
</AppShell>

{#if !dev}
  <Chat src={PUBLIC_TAWK_WIDGET_SCRIPT_SRC} />
{/if}
