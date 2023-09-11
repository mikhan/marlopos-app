<script lang="ts">
  import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'

  export let value: string
  export let placeholder = ''
  let className = ''
  export { className as class }
</script>

<div class="relative">
  <div class="absolute top-0 left-0 grid w-6 h-6 m-2 place-content-center">
    <Fa icon={faSearch} />
  </div>
  <input
    {...$$restProps}
    {placeholder}
    class="px-10 form-input {className}"
    type="search"
    name="q"
    bind:value
    autocomplete="off"
    spellcheck="false" />
  <button
    type="button"
    class="absolute top-0 right-0 grid w-6 h-6 m-2 rounded-full place-content-center focusable focusable-ring"
    class:hidden={value === ''}
    tabindex="-1"
    title="Borrar"
    on:click={() => (value = '')}>
    <Fa icon={faTimes} />
  </button>
</div>

<style lang="postcss">
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    -webkit-appearance: none !important;
  }

  input::-webkit-calendar-picker-indicator {
    display: none !important;
  }
</style>
