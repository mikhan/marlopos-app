<script lang="ts" context="module">
  import { browser } from '$app/environment'
  import { loadScript } from '$core/utils/scripts'
  import { analytics } from '$lib/stores/analytics'

  declare global {
    interface Window {
      dataLayer?: unknown[]
    }
  }

  let initialized = false

  async function init(measurementId: string) {
    if (!browser || initialized) return

    initialized = true
    window.dataLayer ??= []

    const gtag: Gtag.Gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args)
    }

    gtag('js', new Date())
    gtag('config', measurementId)

    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`)

    analytics.subscribe((data) => data && gtag(data.command, ...data.args))
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  export let measurementId: string

  onMount(() => init(measurementId))
</script>
