<script lang="ts">
  import { languageStore } from '$lib/stores/language.store'
  import { metadataStore } from '$lib/stores/metadata.store'
  import { getLanguage } from '$lib/utils/language'

  $: metadata = $metadataStore
  $: if (metadata) languageStore.set(getLanguage(metadata.lang))
</script>

<svelte:head>
  {#if metadata}
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    {#each metadata.links as link}
      {#if link.rel === 'canonical'}
        <link rel="canonical" href={link.href} />
      {:else if link.rel === 'alternate'}
        <link rel="alternate" href={link.href} hreflang={link.hreflang} />
      {/if}
    {/each}
  {/if}
</svelte:head>
