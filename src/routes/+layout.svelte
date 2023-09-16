<script lang="ts">
  import { page } from '$app/stores'
  import UiShell from '$core/components/shell/ui-shell.svelte'
  import AppMetadata from '$lib/components/app/app-metadata.svelte'
  import AppTopbar from '$lib/components/app/app-topbar.svelte'
  import { metadataStore } from '$lib/stores/metadata.store'
  import '../app.scss'

  $: metadataStore.set($page.data.metadata)
</script>

<AppMetadata />

<UiShell>
  <AppTopbar />
  <slot />
</UiShell>
