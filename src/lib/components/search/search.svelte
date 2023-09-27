<script lang="ts">
  import { faSpinner } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { type SearchResult, getSearchEngine } from '$lib/services/search'
  import { languageStore } from '$lib/stores/language.store'
  import type { Language } from '$lib/utils/language'
  import SectionHeader from '../common/section-header.svelte'
  import SearchResults from './search-results.svelte'

  export let query = ''

  async function search(query: string, { locale }: Language): Promise<SearchResult[]> {
    if (!query) return []

    const searchEngine = await getSearchEngine()

    return searchEngine
      .search(query, {
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true,
        filter: (result) => result['data']['locale'] === locale,
      })
      .map((result) => result['data'])
  }

  let resultsPromise: Promise<SearchResult[]>
  $: resultsPromise = search(query, $languageStore)
</script>

<section class="flex flex-col gap-8 layout-lg">
  <SectionHeader class="mt-32">Resultados</SectionHeader>

  {#await resultsPromise}
    <div class="flex items-center gap-2">
      <Fa icon={faSpinner} spin />
      Buscando...
    </div>
  {:then results}
    <SearchResults {results} />
  {/await}
</section>
