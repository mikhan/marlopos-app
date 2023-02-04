<script lang="ts" context="module">
  declare global {
    interface Window {
      Tawk_API: unknown
      Tawk_LoadStart: Date
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { delay } from '$core/utils/async'

  export let src: string

  function createWidget(document: Document, src: string) {
    if (src.startsWith('https://embed.tawk.to/') === false) {
      throw new Error('Invalid Tawk Chat Widget src')
    }

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = '*'
    script.src = src

    const head = document.querySelector('head')
    head?.append(script)
  }

  onMount(() => {
    if (src) delay(3_000).then(() => createWidget(document, src))
  })
</script>
