<script lang="ts">
  import { derived, type Readable } from 'svelte/store'
  import { matchMedia } from '$core/stores/match-media'

  export let data: Api.InformationSchedule[]

  const isLargeScreen = matchMedia('(min-width: 768px)')
  const schedule: Readable<{ start: String; end: String }[]> = derived(isLargeScreen, (isLargeScreen) => {
    const dateStyle = isLargeScreen ? 'long' : 'medium'

    return data.map(({ start, end }) => ({
      start: start.toLocaleDateString(undefined, { dateStyle }),
      end: end.toLocaleDateString(undefined, { dateStyle }),
    }))
  })
</script>

<div
  class="flex flex-col border divide-y elevation-low bg-surface-1-bg overflow-clip text-surface-1-fg divide-surface-1-border border-surface-1-border rounded-3xl">
  <div class="grid grid-cols-2 divide-x bg-surface-2-bg divide-surface-2-border">
    <div class="px-8 py-4 font-bold text-center uppercase">Salida</div>
    <div class="px-8 py-4 font-bold text-center uppercase">Regreso</div>
  </div>
  {#each $schedule as { start, end }}
    <div class="grid grid-cols-2 divide-x divide-surface-1-border">
      <div class="px-8 py-4">{start}</div>
      <div class="px-8 py-4">{end}</div>
    </div>
  {/each}
</div>
