<script lang="ts">
  import { navigating } from '$app/stores'
  import { derived } from 'svelte/store'
  import { alternateLanguagesStore } from '$lib/stores/alternate-languages.store'
  import { languageStore } from '$lib/stores/language.store'
  import { type Language, getLanguage } from '$lib/utils/language'

  const alternateLanguagesCode = derived(alternateLanguagesStore, (links) => links.map(({ hreflang }) => hreflang))
  let languageCodes: string[]
  let languages: Language[]

  $: languageCodes = [$languageStore.code, ...$alternateLanguagesCode]
  $: languages = languageCodes.map((code) => getLanguage(code))
  // $: alternativeLang = getLanguage(languageCodes[(languageCodes.indexOf($languageStore.code) + 1) % languageCodes.length]!)
  $: alternateLink = $alternateLanguagesStore[0]

  // $: alternativeLang = getLanguage(languageCodes[(languageCodes.indexOf($languageStore.code) + 1) % languageCodes.length]!)
  // $: alternativeLang = $metadataStore.links.find(
  //   (link): link is Api.LinkAlternate => link.rel === 'alternate' && link.hreflang !== $languageStore.code,
  // )
  // $: nextLocalizedUrl = setUrlLocale($page.url, alternativeLang.code).toString()
  $: disabled = !!$navigating || !alternateLink
</script>

{#if alternateLink}
  <!-- content here -->
  <a
    class="switch"
    class:disabled
    style:--position={languageCodes.indexOf($languageStore.code)}
    href={alternateLink.href}>
    {#each languages as language (language.code)}
      <div class="switch-option" class:active={$languageStore.code === language.code} aria-hidden="true">
        {language.code}
      </div>
    {/each}
    <div class="sr-only">Translate to {$languageStore.name}</div>
  </a>
{/if}

<style lang="postcss">
  .switch {
    --position: 0;
    position: relative;
    margin-left: auto;
    outline: 1px solid theme('colors.neutral.900 / 50%');
    outline-offset: -1px;
    border-radius: 8px;
    background-color: theme('colors.neutral.100 / 25%');
    width: 72px;
    height: 28px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(calc(var(--position) * 32px));
      transition: transform 150ms ease-in-out;
      border: 4px solid transparent;
      border-radius: 8px;
      background-clip: content-box;
      background-color: theme('colors.neutral.900');
      width: 40px;
      height: 100%;
      content: '';
    }

    &:focus-visible,
    &.disabled {
      outline-color: theme('colors.neutral.900');
      outline-width: 2px;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .switch-option {
    display: grid;
    position: absolute;
    top: 0px;
    right: 0;
    place-content: center;
    z-index: 1;
    transition: color 150ms ease-in-out;
    width: 40px;
    height: 100%;
    font-weight: bold;
    font-size: theme('fontSize.xs[0]');
    line-height: theme('fontSize.xs[1]');

    &:first-child {
      left: 0;
    }

    &.active {
      color: theme('colors.neutral.100');
    }
  }
</style>
