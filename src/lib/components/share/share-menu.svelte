<script lang="ts">
  import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
  import { faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import UiMenuDivider from '$core/components/menu/ui-menu-divider.svelte'
  import UiMenuItem from '$core/components/menu/ui-menu-item.svelte'
  import UiMenu from '$core/components/menu/ui-menu.svelte'
  import { writeToClipboard } from '$core/utils/clipboard'

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

  function copyLink() {
    writeToClipboard(location.href)
  }
</script>

<div>
  <button class="button" id="share-button-menu-trigger">
    <Fa icon={faShareNodes} />
    Compartir
  </button>
</div>

<UiMenu trigger="#share-button-menu-trigger" label="Compartir página">
  <UiMenuItem on:click={copyLink}>
    <Fa class="mr-2" fw icon={faLink} />
    <span>Copiar link</span>
  </UiMenuItem>

  <UiMenuDivider />

  <UiMenuItem on:click={shareToFacebook}>
    <Fa class="mr-2" fw icon={faFacebook} />
    <span>Facebook</span>
  </UiMenuItem>

  <UiMenuItem on:click={shareToTwitter}>
    <Fa class="mr-2" fw icon={faTwitter} />
    <span>Twitter</span>
  </UiMenuItem>
</UiMenu>
