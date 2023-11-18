<script lang="ts">
  import { browser } from '$app/environment'
  import { beforeNavigate } from '$app/navigation'
  import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { dismiss } from '$core/actions/dismiss'
  import { type Shortcut, shortcut } from '$core/actions/shortcut'
  import IconButton from '$core/components/icon-button.svelte'
  import { debounce } from '$core/utils/async'
  import { generateUID } from '$core/utils/element'
  import { getSearchEngine } from '$lib/services/search'
  import OmniboxSuggestions from './omnibox-suggestions.svelte'

  export let expanded = false
  export let value = ''
  let query = ''
  let suggestions: string[] | null = null
  let inputElement: HTMLInputElement
  let formElement: HTMLFormElement
  let selectedId: string | undefined = undefined
  const inputId = generateUID('input')
  const listboxId = generateUID('listbox')

  const showSuggestionsDebounced = debounce(showSuggestions, 250)
  $: showSuggestionsDebounced(query)

  const openShortcut: Shortcut = [open, { ctrlKey: true, key: 'k' }]

  async function showSuggestions(query: string) {
    if (!browser) return
    suggestions = query ? await fetchSuggestions(query) : null
  }

  async function fetchSuggestions(query: string): Promise<string[] | null> {
    if (!expanded) return null

    const searchEngine = await getSearchEngine()
    const suggestions = searchEngine
      .autoSuggest(query, {
        combineWith: 'OR',
        boost: { title: 2 },
        prefix: true,
        fuzzy: false,
        filter: (result) => result['data']['locale'] === 'es-ES',
      })
      .map(({ suggestion }) => suggestion)

    return suggestions
  }

  function open() {
    expanded = true
    inputElement.focus()
    inputElement.select()
  }

  function close() {
    expanded = false
    suggestions = null
    query = value = ''
    inputElement.blur()
  }

  function clear() {
    value = query = ''
    inputElement.focus()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab') close()
  }

  function acceptSuggestion(suggestion?: string, id?: string) {
    value = suggestion || query
    selectedId = id
  }

  beforeNavigate(() => {
    close()
  })
</script>

<svelte:window use:shortcut={openShortcut} />

<div class="omnibox-container">
  <form action="/search" method="GET" autocomplete="off" use:dismiss on:dismiss={close} bind:this={formElement}>
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
    {#if expanded && suggestions?.length}
      <OmniboxSuggestions
        {suggestions}
        on:select={({ detail }) => acceptSuggestion(detail.suggestion, detail.id)}
        on:click={() => formElement.submit()} />
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
    max-height: calc(100dvh - 2rem);
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
</style>
