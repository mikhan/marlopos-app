<script lang="ts" context="module">
  declare global {
    interface Document {
      startViewTransition: (callback: () => void) => ViewTransition
    }

    interface ViewTransition {
      finished: Promise<void>
      ready: Promise<void>
      updateCallbackDone: Promise<void>
      skipTransition: () => void
    }
  }
</script>

<script lang="ts">
  import { onNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import UiShell from '$core/components/shell/ui-shell.svelte'
  import AppMetadata from '$lib/components/app/app-metadata.svelte'
  import AppTopbar from '$lib/components/app/app-topbar.svelte'
  import { metadataStore } from '$lib/stores/metadata.store'
  import '../app.scss'

  $: metadataStore.set($page.data.metadata)

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<AppMetadata />

<UiShell>
  <AppTopbar />
  <slot />
</UiShell>

<style lang="postcss"></style>
