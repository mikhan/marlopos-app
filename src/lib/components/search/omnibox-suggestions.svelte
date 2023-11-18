<script lang="ts">
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher } from 'svelte'
  import Fa from 'svelte-fa'
  import type { Action } from 'svelte/action'
  import { generateUID } from '$core/utils/element'

  export let suggestions: string[]
  let selected: string | undefined = undefined
  let items: Array<string | undefined>
  $: items = [undefined, ...suggestions]
  let optionElementsIndex: Record<string, HTMLElement> = {}
  const listboxId = generateUID('listbox')

  const dispatch = createEventDispatcher<{
    select: { suggestion: string | undefined; id: string | undefined }
  }>()

  function selectSuggestion(suggestion: string | undefined) {
    const optionElement = (suggestion && optionElementsIndex[suggestion]) || null
    optionElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    selected = suggestion
    dispatch('select', { suggestion, id: optionElement?.id })
  }

  function onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        selectSuggestion(items.at(items.indexOf(selected) - 1))
        event.preventDefault()
        break

      case 'ArrowDown':
        selectSuggestion(items.at(items.indexOf(selected) + 1))
        event.preventDefault()
        break
    }
  }

  const registerOptionElement: Action<HTMLElement, string> = (element, suggestion) => {
    optionElementsIndex[suggestion] = element
  }
</script>

<svelte:body on:keydown={onKeydown} />

<ul role="listbox" id={listboxId} aria-label="Sugerencias de búsqueda">
  {#each suggestions as suggestion}
    {#key suggestion}
      <li>
        <button
          type="button"
          role="option"
          aria-selected={selected === suggestion}
          tabindex="-1"
          id={generateUID()}
          use:registerOptionElement={suggestion}
          on:pointerdown={() => selectSuggestion(suggestion)}
          on:click>
          <span class="grid w-10 h-10 place-content-center shrink-0">
            <Fa icon={faSearch} />
          </span>
          <span class="pr-2 truncate">{suggestion}</span>
        </button>
      </li>
    {/key}
  {/each}
</ul>

<style lang="postcss">
  [role='listbox'] {
    display: flex;
    flex-direction: column;
    border-top: 1px solid theme('colors.surface-2.border');
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  [role='option'] {
    display: flex;
    align-items: center;
    outline: none;
    width: 100%;
    height: theme('spacing.10');
    text-align: left;

    &:is(:hover, [aria-selected='true']) {
      background-color: theme('colors.surface-2.hover');
    }
  }
</style>
