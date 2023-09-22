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

  export let expanded = true
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
      {#if !expanded}
        <code class="">CTRL+K</code>
      {/if}
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
    width: theme('spacing.10');
    max-width: theme('maxWidth.prose');
    height: theme('spacing.10');
    z-index: 100;
    margin-inline: auto;
    transition-property: width, scale;
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;

    @media (min-width: theme('screens.md')) {
      width: theme('spacing.44');
    }

    &:has([aria-expanded='true']) {
      width: 100%;
      transition-delay: 250ms;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    transform: scale(0.9);
    transform-origin: right center;
    max-height: calc(100vh - 2rem);
    color: theme('colors.surface-1.fg');
    background-color: theme('colors.surface-1.bg');
    outline: 1px solid theme('colors.surface-1.border');
    outline-offset: -1px;
    border-radius: theme('spacing.5');
    transition-property: all;
    transition-duration: 250ms;
    transition-delay: 0ms;
    transition-timing-function: ease-in-out;
    box-shadow: none;
    overflow: clip;

    &:has([aria-expanded='true']) {
      transition-delay: 250ms;
      color: theme('colors.surface-2.fg');
      background-color: theme('colors.surface-2.bg');
      outline-color: theme('colors.surface-2.border');
      border-radius: theme('borderRadius.DEFAULT');
      box-shadow: theme('elevation.hight');
      transform: scale(1);
    }

    & > div {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      height: theme('spacing.10');
      position: relative;
    }
  }

  label {
    display: grid;
    place-content: center;
    height: 100%;
    aspect-ratio: 1/1;
    flex: 0 0 auto;
    position: absolute;
  }

  input {
    width: 100%;
    height: 100%;
    box-shadow: none;
    background: transparent;
    outline: none;
    padding-left: theme('spacing.10');
    transition: opacity 250ms;
  }

  code {
    font-size: theme('fontSize.xs[0]');
    line-height: theme('fontSize.xs[1]');
    padding-inline: theme('spacing.1');
    margin-inline-end: theme('spacing.3');
    border: 1px solid theme('colors.current');
    border-radius: theme('borderRadius.DEFAULT');
    opacity: 0.5;
  }
</style>
