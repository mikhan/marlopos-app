<script lang="ts">
  import { navigating } from '$app/stores'
  import { derived } from 'svelte/store'
  import { alternateLanguagesStore } from '$lib/stores/alternate-languages.store'
  import { languageStore } from '$lib/stores/language.store'
  import { type LanguageCode, getLanguage } from '$lib/utils/language'

  const alternateLanguagesCode = derived(alternateLanguagesStore, (links) =>
    links.map(({ hreflang }) => hreflang as LanguageCode),
  )

  $: activeLang = $languageStore
  $: languageCodes = [activeLang.code].concat($alternateLanguagesCode)
  $: languages = languageCodes.map((code) => getLanguage(code))
  // $: alternativeLang = getLanguage(languageCodes[(languageCodes.indexOf(activeLang.code) + 1) % languageCodes.length]!)
  $: alternateLink = $alternateLanguagesStore[0]

  // $: alternativeLang = getLanguage(languageCodes[(languageCodes.indexOf(activeLang.code) + 1) % languageCodes.length]!)
  // $: alternativeLang = $metadataStore.links.find(
  //   (link): link is Api.LinkAlternate => link.rel === 'alternate' && link.hreflang !== activeLang.code,
  // )
  // $: nextLocalizedUrl = setUrlLocale($page.url, alternativeLang.code).toString()
  $: disabled = !!$navigating || !alternateLink
</script>

{#if alternateLink}
  <!-- content here -->
  <a class="switch" class:disabled style:--position={languageCodes.indexOf(activeLang.code)} href={alternateLink.href}>
    {#each languages as language (language.code)}
      <div class="switch-option" class:active={activeLang.code === language.code} aria-hidden="true">
        {language.code}
      </div>
    {/each}
    <div class="sr-only">Translate to {activeLang.name}</div>
  </a>
{/if}

<style lang="postcss">
  .switch {
    --position: 0;
    width: 72px;
    height: 28px;
    background-color: theme('colors.neutral.100 / 25%');
    outline: 1px solid theme('colors.neutral.900 / 50%');
    outline-offset: -1px;
    border-radius: 8px;
    position: relative;
    margin-left: auto;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 40px;
      top: 0;
      left: 0;
      background-color: theme('colors.neutral.900');
      background-clip: content-box;
      border: 4px solid transparent;
      border-radius: 8px;
      transition: transform 150ms ease-in-out;
      transform: translateX(calc(var(--position) * 32px));
    }

    &:focus-visible,
    &.disabled {
      outline-color: theme('colors.neutral.900');
      outline-width: 2px;
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .switch-option {
    display: grid;
    place-content: center;
    height: 100%;
    width: 40px;
    top: 0px;
    z-index: 1;
    position: absolute;
    transition: color 150ms ease-in-out;
    font-size: theme('fontSize.xs[0]');
    line-height: theme('fontSize.xs[1]');
    font-weight: bold;
    right: 0;

    &:first-child {
      left: 0;
    }

    &.active {
      color: theme('colors.neutral.100');
    }
  }
</style>
