<script lang="ts">
  import AppMetadata from '$lib/components/app/app-metadata.svelte'
  import AppTopbar from '$lib/components/app/app-topbar.svelte'
  import AppFooter from '$lib/components/app/app-footer.svelte'
  import type { LayoutData } from './$types'
  import { page } from '$app/stores'
  import { metadataStore } from '$lib/stores/metadata.store'
  import '../app.scss'
  import UiNavigationProgress from '$core/components/shell/ui-navigation-progress.svelte'
  import UiShell from '$core/components/shell/ui-shell.svelte'
  import AppContent from '$lib/components/app/app-content.svelte'

  $: metadataStore.set($page.data.metadata)

  export let data: LayoutData
</script>

<AppMetadata />

<UiShell>
  <UiNavigationProgress />
  <AppTopbar />
  <AppContent pageId={data.href}>
    <slot />
  </AppContent>
  <AppFooter data={data.information} />
</UiShell>
