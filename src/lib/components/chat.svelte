<script lang="ts" context="module">
  declare global {
    interface Window {
      Tawk_API?: Record<string, unknown>
      Tawk_LoadStart?: Date
    }
  }
</script>

<script lang="ts">
  import { loadScript } from '$core/utils/scripts'

  export let propertyId: string
  export let chatId: string

  const showPlaceholder = Boolean(propertyId && chatId)
  let widgetLoaded = false
  let openWidget = false

  function createWidget() {
    if ('Tawk_API' in window) return

    window.Tawk_LoadStart = new Date()
    window.Tawk_API = {}

    window.Tawk_API['onLoad'] = function () {
      widgetLoaded = true

      if (window.Tawk_API && openWidget) {
        const maximize = window.Tawk_API['maximize'] as () => void
        maximize()
      }
    }

    window.Tawk_API['customStyle'] = {
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
</script>

{#if showPlaceholder}
  <button
    type="button"
    disabled={widgetLoaded}
    on:mouseover={createWidget}
    on:focus={createWidget}
    on:click={() => (openWidget = true)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      height="32px"
      width="32px"
      role="img"
      class="tawk-min-chat-icon"
      ><path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="currentColor"
        d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z" /></svg>
    <span class="sr-only">Chat</span>
  </button>
{/if}

<style lang="postcss">
  button {
    display: grid;
    place-content: center;
    width: 60px;
    height: 60px;
    position: fixed;
    right: 20px;
    bottom: 16px;
    border-radius: 100%;
    background-color: #8471b1;
    color: #ffffff;
    z-index: 1000001 !important;
  }
</style>
