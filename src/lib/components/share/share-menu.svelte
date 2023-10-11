<script lang="ts">
  import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope, faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import UiMenuDivider from '$core/components/menu/ui-menu-divider.svelte'
  import UiMenuItem from '$core/components/menu/ui-menu-item.svelte'
  import UiMenu from '$core/components/menu/ui-menu.svelte'
  import { writeToClipboard } from '$core/utils/clipboard'

  let shareData: ShareData = {}
  let canShare = false

  onMount(() => {
    shareData = {
      url: location.href,
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    }

    canShare = navigator.canShare(shareData)
  })

  function shareToWhatsapp() {
    const url = new URL('https://wa.me')
    url.searchParams.set('text', location.href)
    window.open(url, '_blank')
  }

  function shareToFacebook() {
    const url = new URL('https://facebook.com/sharer/sharer.php')
    url.searchParams.set('u', location.href)
    window.open(url, '_blank')
  }

  function shareToTwitter() {
    const url = new URL('http://twitter.com/share')
    url.searchParams.set('text', document.title)
    url.searchParams.set('url', location.href)
    window.open(url, '_blank')
  }

  function shareToEmail() {
    window.open(`mailto:?subject=${document.title}&body=${location.href}`)
  }

  function copyLink() {
    writeToClipboard(location.href)
  }

  async function share() {
    try {
      await navigator.share(shareData)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    }
  }
</script>

<button class="button button-filled" id="share-button-menu-trigger">
  <Fa icon={faShareNodes} />
  Compartir
</button>

<UiMenu trigger="#share-button-menu-trigger" label="Compartir página">
  <UiMenuItem on:click={copyLink}>
    <Fa class="mr-2" fw icon={faLink} />
    <span>Copiar link</span>
  </UiMenuItem>

  <UiMenuDivider />

  <UiMenuItem on:click={shareToEmail}>
    <Fa class="mr-2" fw icon={faEnvelope} />
    <span>Email</span>
  </UiMenuItem>

  <UiMenuItem on:click={shareToWhatsapp}>
    <Fa class="mr-2" fw icon={faWhatsapp} />
    <span>Whatsapp</span>
  </UiMenuItem>

  <UiMenuItem on:click={shareToFacebook}>
    <Fa class="mr-2" fw icon={faFacebook} />
    <span>Facebook</span>
  </UiMenuItem>

  <UiMenuItem on:click={shareToTwitter}>
    <Fa class="mr-2" fw icon={faTwitter} />
    <span>Twitter</span>
  </UiMenuItem>

  {#if canShare}
    <UiMenuDivider />

    <UiMenuItem on:click={share}>
      <Fa class="mr-2" fw icon={faShareNodes} />
      <span>Más opciones...</span>
    </UiMenuItem>
  {/if}
</UiMenu>
