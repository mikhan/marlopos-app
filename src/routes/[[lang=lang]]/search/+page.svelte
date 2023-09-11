<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import type { Suggestion } from 'minisearch'
  import { writable } from 'svelte/store'
  import InputSearch from '$core/components/input/input-search.svelte'
  import { debounce } from '$core/utils/async'

  // import type { PageData } from './$types'

  // export let data: PageData

  const query = writable<string>($page.url.searchParams.get('q') ?? '')
  const suggestions = writable<Suggestion[]>([])

  const showSuggestions = debounce(async (query: string) => {
    if (!browser) return
    let data: Suggestion[] = []
    console.log({ query })

    if (query) {
      const url = new URL('/search/', location.origin)
      url.searchParams.set('q', encodeURIComponent(query))
      const result = await fetch(url)
      data = (await result.json()) as Suggestion[]
    }

    suggestions.set(data)
  }, 250)

  $: showSuggestions($query)
</script>

<form class="p-8" action="/search/">
  <InputSearch class="rounded-full" name="q" list="search-suggestions" bind:value={$query} />
  <datalist id="search-suggestions">
    {#each $suggestions as suggestion}
      <option>{suggestion.suggestion}</option>
    {/each}
  </datalist>
</form>

<pre><code>{JSON.stringify($suggestions, null, 2)}</code></pre>

<style lang="postcss">
</style>
