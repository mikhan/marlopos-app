<script lang="ts" context="module">
  declare const window: Window &
    typeof globalThis & {
      Tawk_API: any
      Tawk_LoadStart: Date
    }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { delay } from '$core/utils/async'
  import { loadScript } from '$core/utils/scripts'

  export let propertyId: string
  export let chatId: string
  export let delayMs = 0

  function createWidget() {
    window.Tawk_LoadStart = new Date()
    window.Tawk_API ??= {}

    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br',
          xOffset: '16px',
          yOffset: '16px',
        },
        mobile: {
          position: 'br',
          xOffset: '12px',
          yOffset: '16px',
        },
        bubble: {
          rotate: '0deg',
          xOffset: '20px',
          yOffset: '20px',
        },
      },
    }

    loadScript(`https://embed.tawk.to/${propertyId}/${chatId}`)
  }

  onMount(async () => {
    if (!propertyId || !chatId) return

    if (delayMs) await delay(delayMs)

    createWidget()
  })
</script>

<div />

<style lang="postcss">
  div {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 4px;

    @media (min-width: theme('screens.lg')) {
      display: none;
    }
  }
</style>
