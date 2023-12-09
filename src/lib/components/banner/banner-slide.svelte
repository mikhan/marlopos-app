<script lang="ts">
  import { page } from '$app/stores'
  import type { Api } from '$lib/api'
  import { languageStore } from '$lib/stores/language.store'
  import { getLocalizedUrl } from '$lib/utils/language'
  import CoverImage from '../common/cover-image.svelte'
  import PackageHeader from '../package/package-header.svelte'

  export let data: Api.Banner
  export let index: number

  const makeRelative = (url: URL) => url.toString().substring(url.origin.length)
  $: href = makeRelative(getLocalizedUrl(new URL(`/packages/${data.id}`, $page.url), $languageStore.code))
</script>

<PackageHeader title={data.name} description={data.description}>
  <svelte:fragment slot="background">
    <CoverImage data={data.cover} priority={index === 0} />
  </svelte:fragment>
  <svelte:fragment slot="toolbar">
    <a {href} class="button button-primary button-filled" data-sveltekit-preload-data>Más información</a>
  </svelte:fragment>
</PackageHeader>
