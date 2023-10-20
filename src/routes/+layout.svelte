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
  import { dev } from '$app/environment'
  import { onNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { PUBLIC_TAWK_CHAT_ID, PUBLIC_TAWK_PROPERTY_ID } from '$env/static/public'
  import UiShell from '$core/components/shell/ui-shell.svelte'
  import AppMetadata from '$lib/components/app/app-metadata.svelte'
  import AppTopbar from '$lib/components/app/app-topbar.svelte'
  import Chat from '$lib/components/chat.svelte'
  import Dev from '$lib/components/common/dev.svelte'
  import { metadataStore } from '$lib/stores/metadata.store'
  import '../app.scss'

  $: if ($page.data.metadata) {
    metadataStore.set($page.data.metadata)
  }

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

<UiShell>
  <AppMetadata />
  <AppTopbar />
  <slot />
  <Chat propertyId={PUBLIC_TAWK_PROPERTY_ID} chatId={PUBLIC_TAWK_CHAT_ID} />
</UiShell>

{#if dev}
  <Dev />
{/if}
