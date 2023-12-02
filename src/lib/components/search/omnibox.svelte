<script lang="ts" context="module">
  export const [getOmniboxContext, setOmniboxContext] = createContext<{
    registerOptionElement: Action<HTMLAnchorElement>
    selected: Readable<HTMLAnchorElement | null>
  }>()
</script>

<script lang="ts">
  import { browser } from '$app/environment'
  import { beforeNavigate } from '$app/navigation'
  import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
  import MiniSearch from 'minisearch'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import type { Action } from 'svelte/action'
  import { type Readable, get, writable } from 'svelte/store'
  import { dismiss } from '$core/actions/dismiss'
  import { type Shortcut, shortcut } from '$core/actions/shortcut'
  import IconButton from '$core/components/icon-button.svelte'
  import { createContext } from '$core/services/context'
  import { debounce } from '$core/utils/async'
  import { documentPositionSorter, generateUID } from '$core/utils/element'
  import { mod } from '$core/utils/math'
  import { removeDiacritics } from '$core/utils/string'
  import type { SearchIndex, SearchResult } from '$lib/services/search'
  import { languageStore } from '$lib/stores/language.store'
  import { DEFAULT_LANGUAGE } from '$lib/utils/language'
  import OmniboxResults from './omnibox-results.svelte'

  export let expanded = false
  export let value = ''

  let query = ''
  let results: SearchResult[] | null = null
  let inputElement: HTMLInputElement
  let formElement: HTMLFormElement
  let elements: HTMLAnchorElement[] = []
  let loading = false
  const selected = writable<HTMLAnchorElement | null>(null)
  let selectedId: string | undefined = undefined
  const inputId = generateUID('input')
  const listboxId = generateUID('listbox')
  const showResultsDebounced = debounce(showResults, 50)
  let searchEnginePromise: Promise<MiniSearch<SearchIndex>> | undefined = undefined

  $: showResultsDebounced(query)
  $: locale = $languageStore.locale

  const openShortcut: Shortcut = [open, { ctrlKey: true, key: 'k' }]

  async function showResults(query: string) {
    if (browser && expanded && query) {
      results = (await getSearchEngine())
        .search(removeDiacritics(query), {
          boost: { title: 2 },
          fuzzy: 0.2,
          prefix: true,
        })
        .map((result) => result['data'])
    } else {
      results = null
    }
  }

  function select(delta: number) {
    selected.update((selected) => {
      elements.sort(documentPositionSorter)
      const currentIndex = selected ? elements.indexOf(selected) : -1

      return elements.at(mod(currentIndex + delta, elements.length)) ?? null
    })
  }

  async function getSearchEngine() {
    if (!searchEnginePromise) {
      loading = true
      searchEnginePromise = fetch(`${locale === DEFAULT_LANGUAGE.locale ? '' : `/${locale}`}/search/index.json`)
        .then((response) => response.json())
        .then((searchIndex: SearchIndex) => MiniSearch.loadJS(searchIndex.data, searchIndex.options))
        .finally(() => (loading = false))
    }

    return searchEnginePromise
  }

  function open() {
    getSearchEngine()
    expanded = true
    inputElement.focus()
    inputElement.select()
  }

  function close() {
    expanded = false
    results = null
    query = value = ''
    inputElement.blur()
  }

  function clear() {
    value = query = ''
    inputElement.focus()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      close()
    } else if (event.key === 'ArrowUp') {
      select(-1)
      event.preventDefault()
    } else if (event.key === 'ArrowDown') {
      select(+1)
      event.preventDefault()
    }
  }

  function navigateTo(event: Event) {
    const element = get(selected)
    if (element) element.click()
    event.preventDefault()
  }

  beforeNavigate(() => {
    close()
  })

  function registerOptionElement(element: HTMLAnchorElement) {
    elements = [...elements, element]

    return {
      destroy() {
        elements = elements.filter((e) => e !== element)
        selected.update((selected) => (selected && elements.includes(selected) ? selected : null))
      },
    }
  }

  setOmniboxContext({
    registerOptionElement,
    selected: { subscribe: selected.subscribe },
  })

  onMount(() => {
    if (document.activeElement === inputElement) {
      open()
    }
  })
</script>

<svelte:window use:shortcut={openShortcut} />

<div class="omnibox-container">
  <form autocomplete="off" on:submit={navigateTo} use:dismiss on:dismiss={close} bind:this={formElement}>
    <div>
      <label for={inputId}><Fa icon={faSearch} /><span class="sr-only">Buscar</span></label>
      <input
        type="text"
        name="q"
        id={inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={expanded}
        aria-activedescendant={selectedId}
        placeholder="Buscar..."
        bind:value
        bind:this={inputElement}
        on:focus={open}
        on:input={() => (query = value)}
        on:keydown={onKeydown} />
      {#if value}
        <div class="grid h-full aspect-square place-content-center">
          <IconButton icon={faTimes} title="Borrar búsqueda" size="sm" tabindex={-1} on:click={clear} />
        </div>
      {/if}
      <code aria-hidden="true">CTRL+K</code>
    </div>
    {#if query && loading}
      <div class="loading-indicator" />
    {/if}
    {#if expanded && results}
      <OmniboxResults {results} />
    {/if}
  </form>
</div>

<style lang="postcss">
  .omnibox-container {
    position: relative;
    z-index: 100;
    transition-duration: 250ms;
    transition-property: width, scale;
    transition-timing-function: ease-in-out;
    margin-inline-start: auto;
    width: theme('spacing.10');
    height: theme('spacing.10');

    @media (min-width: theme('screens.md')) {
      width: theme('spacing.44');
    }

    &:has([aria-expanded='true']) {
      width: 100%;

      &::before {
        position: fixed;
        animation: backdrop-show 250ms ease-in;
        inset: 0;
        background-color: theme('colors.neutral.900 / 50%');
        pointer-events: none;
        content: '';
      }
    }

    @keyframes backdrop-show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  form {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: column;
    transform: scale(0.9);
    transform-origin: right center;
    transition-delay: 0ms;
    transition-duration: 250ms;
    transition-property: all;
    transition-timing-function: ease-in-out;
    outline: 1px solid theme('colors.surface-1.border');
    outline-offset: -1px;
    box-shadow: none;
    border-radius: theme('spacing.5');
    background-color: theme('colors.surface-1.bg');
    width: 100%;
    max-height: 60svh;
    overflow: hidden;
    color: theme('colors.surface-1.fg');

    &:has([aria-expanded='true']) {
      transform: scale(1);
      transition-delay: 250ms;
      outline-color: theme('colors.surface-2.border');
      box-shadow: theme('elevation.low');
      border-radius: theme('borderRadius.DEFAULT');
      background-color: theme('colors.surface-2.bg');
      color: theme('colors.surface-2.fg');
    }

    & > div {
      display: flex;
      position: relative;
      flex: 0 0 auto;
      align-items: center;
      height: theme('spacing.10');
    }
  }

  label {
    display: grid;
    position: absolute;
    left: 0;
    flex: 0 0 auto;
    place-content: center;
    aspect-ratio: 1/1;
    height: 100%;
    pointer-events: none;
  }

  input {
    opacity: 0;
    transition: opacity 250ms;
    outline: none;
    box-shadow: none;
    background: transparent;
    padding-left: theme('spacing.10');
    width: 100%;
    height: 100%;

    &[aria-expanded='true'] {
      opacity: 1;
    }

    @media (min-width: theme('screens.md')) {
      opacity: 1;
    }
  }

  code {
    position: absolute;
    right: 0;
    opacity: 0;
    transition: opacity 250ms;
    margin-inline-end: theme('spacing.3');
    border: 1px solid theme('colors.current');
    border-radius: theme('borderRadius.DEFAULT');
    padding-inline: theme('spacing.1');
    pointer-events: none;
    font-size: theme('fontSize.xs[0]');
    line-height: theme('fontSize.xs[1]');

    @media (min-width: theme('screens.md')) {
      opacity: 0.5;
      transition-delay: 250ms;
    }

    form:has([aria-expanded='true']) & {
      opacity: 0;
    }
  }

  .loading-indicator {
    position: absolute;
    bottom: 0;
    animation: 500ms ease-in-out infinite alternate ping;
    background-image: linear-gradient(to right, theme('colors.primary.500'), theme('colors.primary.500'));
    background-size: 10% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 4px;
  }

  @keyframes ping {
    from {
      background-position: 0% 0%;
    }
    to {
      background-position: 100% 0%;
    }
  }
</style>
