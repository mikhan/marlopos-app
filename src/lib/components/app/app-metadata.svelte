<script lang="ts">
  import { languageStore } from '$lib/stores/language.store'
  import { metadataStore } from '$lib/stores/metadata.store'
  import { getLanguage } from '$lib/utils/language'

  $: if ($metadataStore) languageStore.set(getLanguage($metadataStore.lang))
</script>

<svelte:head>
  {#if $metadataStore}
    <title>{$metadataStore.title}</title>
    <meta name="description" content={$metadataStore.description} />
    {#each $metadataStore.links as link}
      {#if link.rel === 'canonical'}
        <link rel="canonical" href={link.href} />
      {:else if link.rel === 'alternate'}
        <link rel="alternate" href={link.href} hreflang={link.hreflang} />
      {/if}
    {/each}
  {/if}
</svelte:head>
