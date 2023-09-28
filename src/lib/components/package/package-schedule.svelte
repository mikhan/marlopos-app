<script lang="ts">
  import { matchMedia } from '$core/stores/match-media'
  import type { Api } from '$lib/api'
  import { languageStore } from '$lib/stores/language.store'

  export let data: Api.PackageSchedule[]
  let dateFormat: 'long' | 'short'
  let locale: string

  const isLgcreen = matchMedia('(min-width: 480px)')
  const currentYear = new Date().getFullYear()

  $: dateFormat = $isLgcreen ? 'long' : ('short' as const)
  $: locale = $languageStore.locale

  function dateToString(date: Date, format: 'long' | 'short', locale: string) {
    return date.toLocaleDateString(locale, {
      year: format === 'short' || currentYear !== date.getFullYear() ? 'numeric' : undefined,
      month: format,
      day: 'numeric',
    })
  }
</script>

<div
  class="flex flex-col border divide-y rounded elevation-low bg-surface-1-bg overflow-clip text-surface-1-fg divide-surface-1-border border-surface-1-border">
  <div class="grid grid-cols-2 divide-x bg-surface-2-bg divide-surface-2-border">
    <div class="px-4 py-2 font-bold text-center uppercase md:px-8 md:py-4">Salida</div>
    <div class="px-4 py-2 font-bold text-center uppercase md:px-8 md:py-4">Regreso</div>
  </div>
  {#each data as { start, end }}
    <div class="grid grid-cols-2 divide-x divide-surface-1-border">
      <div class="px-4 py-2 md:px-8 md:py-4">{dateToString(start, dateFormat, locale)}</div>
      <div class="px-4 py-2 md:px-8 md:py-4">{dateToString(end, dateFormat, locale)}</div>
    </div>
  {/each}
</div>
