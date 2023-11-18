<script lang="ts">
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  export let value = ''
  export let autofocus = false
  let element: HTMLInputElement
  let container: HTMLElement

  function onInput() {
    value = element.value
  }

  function clear() {
    value = element.value = ''
    element.focus()
  }

  onMount(() => {
    const input = container.querySelector('input')
    if (!input) throw new Error('You need to provide an input element')

    element = input
    element.setAttribute('type', 'search')
    element.addEventListener('input', onInput)

    value = element.value

    if (autofocus) element.focus()

    return () => element.removeEventListener('input', onInput)
  })
</script>

<div class="_container" {...$$restProps} bind:this={container}>
  <!-- <div class="absolute top-0 left-0 grid w-6 h-6 m-2 pointer-events-none place-content-center">
    <Fa icon={faSearch} />
  </div> -->
  <slot>
    <input />
  </slot>
  <button
    type="button"
    class="grid w-6 h-6 m-2 rounded-full place-content-center focusable focusable-ring shrink-0"
    class:hidden={value === ''}
    tabindex="-1"
    title="Borrar"
    on:click={clear}>
    <Fa icon={faTimes} />
  </button>
</div>

<style lang="postcss">
  :where(._container) {
    display: flex;
    position: relative;
    background-color: Field;
    width: 100%;
    color: FieldText;

    :global(:where(input)) {
      border: none;
      background: transparent;
      padding-left: 0;
    }

    :global(:where(input:not(:placeholder-shown))) {
      padding-right: theme('spacing.10');
    }

    :global(input::-webkit-search-decoration),
    :global(input::-webkit-search-cancel-button),
    :global(input::-webkit-search-results-button),
    :global(input::-webkit-search-results-decoration) {
      -webkit-appearance: none !important;
    }

    :global(input::-webkit-calendar-picker-indicator) {
      display: none !important;
    }
  }
</style>
