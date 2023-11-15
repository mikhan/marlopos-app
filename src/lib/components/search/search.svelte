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

{#await resultsPromise}
  <div class="grid mt-16 place-content-center grow">
    <div class="flex items-center gap-4">
      <Fa icon={faSpinner} spin size="2x" />
      <span class="text-3xl">Buscando...</span>
    </div>
  </div>
{:then results}
  <section class="gap-y-8 layout-container grow">
    <div class="px-4 layout-lg">
      <SectionHeader class="mt-32 mb-16">Resultados</SectionHeader>

      <SearchResults {results} />
    </div>
  </section>
{/await}
