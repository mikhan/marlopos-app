<script lang="ts">
  import { languageStore } from '$lib/stores/language-store'
  import { getLanguage, LANGUAGES } from '$lib/utils/language'
  import { navigating } from '$app/stores'

  const languages = Object.values(LANGUAGES)
  const languageCodes = Object.keys(LANGUAGES)

  $: activeLang = $languageStore
  $: alternativeLang = getLanguage(languageCodes[(languageCodes.indexOf(activeLang.code) + 1) % languageCodes.length]!)
  // $: nextLocalizedUrl = setUrlLocale($page.url, alternativeLang.code).toString()
  $: disabled = !!$navigating
</script>

<button
  class="switch"
  class:disabled
  style:--position={languageCodes.indexOf(activeLang.code)}
  on:click={() => ($languageStore = alternativeLang)}>
  {#each languages as language (language.code)}
    <div class="switch-option" class:active={activeLang.code === language.code} aria-hidden="true">{language.code}</div>
  {/each}
  <div class="sr-only">Translate to {activeLang.name}</div>
</button>

<style lang="scss">
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

    &-option {
      display: grid;
      place-content: center;
      height: 100%;
      width: 40px;
      top: 0px;
      z-index: 1;
      position: absolute;
      transition: color 150ms ease-in-out;
      font-size: theme('fontSize.xs');
      font-weight: bold;
      right: 0;

      &:first-child {
        left: 0;
      }

      &.active {
        color: theme('colors.neutral.100');
      }
    }
  }
</style>
