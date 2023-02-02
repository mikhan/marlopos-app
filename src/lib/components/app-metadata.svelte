<script lang="ts">
  import { browser } from '$app/environment'
  import { languageStore } from '$lib/stores/language.store'
  import { metadataStore } from '$lib/stores/metadata.store'
  import { getLanguage } from '$lib/utils/language'
  let i = 0

  $: metadata = $metadataStore
  $: if (metadata) languageStore.set(getLanguage(metadata.lang))
  $: if (metadata && browser) {
    console.group(++i)
    console.log('Title:', metadata.title)
    console.log('Description:', metadata.description)
    console.log('Language:', metadata.lang)
    metadata.links.forEach((link) => console.log(link))
    console.groupEnd()
  }
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

{#if metadata}
  <div class="absolute bg-neutral-200 border border-neutral-200-fg left-2 bottom-2 p-2 z-10 text-sm flex">
    <div>
      <div class="text-lg">{metadata.title}</div>
      <div>{metadata.description}</div>
      <div>Language: {metadata.lang}</div>
      {#each metadata.links as link}
        <a href={link.href}>{JSON.stringify(link)}</a>
      {/each}
    </div>
    <div>{i}</div>
  </div>
{/if}
