<script>
  import UiMenuDivider from '$core/components/menu/ui-menu-divider.svelte'
  import UiMenuItem from '$core/components/menu/ui-menu-item.svelte'
  import UiMenu from '$core/components/menu/ui-menu.svelte'
  import { faFacebook } from '@fortawesome/free-brands-svg-icons'
  import { faLink, faShareSquare } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { page } from '$app/stores'

  $: facebookHref = encodeURI(`https://facebook.com/sharer/sharer.php?u=${$page.url}`)
</script>

<div>
  <button class="button" id="share-button-menu-trigger">
    Compartir
    <Fa icon={faShareSquare} />
  </button>
</div>

<UiMenu trigger="#share-button-menu-trigger">
  <UiMenuItem icon={faLink}>Copiar link</UiMenuItem>
  <UiMenuDivider />
  <UiMenuItem icon={faFacebook} href={facebookHref} target="_blank">Compartir en Facebook</UiMenuItem>
</UiMenu>
