<script lang="ts">
  import logotipo from '$lib/assets/logotipo.png'
  import { languageStore } from '$lib/stores/language.store'
  import { metadataStore } from '$lib/stores/metadata.store'
  import { getLanguage } from '$lib/utils/language'

  $: if ($metadataStore) $languageStore = getLanguage($metadataStore.lang)
</script>

<svelte:head>
  {#if $metadataStore}
    <title>{$metadataStore.title} | Viajes Marlopos</title>
    <meta name="description" content={$metadataStore.description} />

    <meta property="og:title" content={$metadataStore.title} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Viajes Marlopos" />
    <meta property="og:description" content={$metadataStore.description} />
    <meta property="og:image" content={'http://localhost:5173' + logotipo} />
    <meta property="og:image:width" content="84" />
    <meta property="og:image:height" content="84" />
    <meta property="og:image:type" content="image/png" />
    {#each $metadataStore.links as link}
      {#if link.rel === 'canonical'}
        <meta property="og:locale" content={$metadataStore.lang} />
        <meta property="og:url" content={link.href} />
      {:else if link.rel === 'alternate'}
        <meta property="og:locale:alternate" content={link.hreflang} />
      {/if}
    {/each}

    {#each $metadataStore.links as link}
      {#if link.rel === 'canonical'}
        <link rel="canonical" href={link.href} />
      {:else if link.rel === 'alternate'}
        <link rel="alternate" href={link.href} hreflang={link.hreflang} />
      {/if}
    {/each}
  {/if}
</svelte:head>
