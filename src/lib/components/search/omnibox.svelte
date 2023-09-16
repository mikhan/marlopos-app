<script lang="ts">
  import { browser } from '$app/environment'
  import { beforeNavigate } from '$app/navigation'
  import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { dismiss } from '$core/actions/dismiss'
  import IconButton from '$core/components/icon-button.svelte'
  import { debounce } from '$core/utils/async'
  import { generateUID } from '$core/utils/element'
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

  async function showSuggestions(query: string) {
    if (!browser) return
    suggestions = query ? await fetchSuggestions(query) : null
  }

  async function fetchSuggestions(query: string): Promise<string[]> {
    const url = new URL('/search-suggestions', location.origin)
    url.searchParams.set('q', query)
    const response = await fetch(url)
    return response.json()
  }

  function open() {
    expanded = true
    inputElement.focus()
  }

  function close() {
    expanded = false
    suggestions = null
    query = ''
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
    expanded = false
  })
</script>

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
          <IconButton icon={faTimes} title="Borrar búsqueda" tabindex={-1} on:click={clear} />
        </div>
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
    transition: width 250ms ease-in-out;

    &:has([aria-expanded='true']) {
      width: 100%;
      transition: width 250ms 250ms ease-in-out;

      form {
        transition: border-radius 250ms 250ms ease-in-out;
        border-radius: theme('borderRadius.DEFAULT');
      }

      input {
        opacity: 1;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-height: calc(100vh - 2rem);
    color: theme('colors.surface-2.fg');
    background-color: theme('colors.surface-2.bg');
    border: 1px solid theme('colors.surface-2.border');
    border-radius: theme('spacing.5');
    transition: border-radius 250ms ease-in-out;
    overflow: clip;

    & > div {
      display: flex;
      flex: 0 0 auto;
      height: 38px;
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
    padding-left: 39px;
    opacity: 0;
    transition: opacity 250ms;
  }
</style>
