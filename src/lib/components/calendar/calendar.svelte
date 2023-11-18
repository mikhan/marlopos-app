<script lang="ts">
  import { mousescroll } from '$core/actions/mousescroll'
  import { getToday } from '$core/constants/today'
  import type { Api } from '$lib/api'
  import CalendarEntry from '$lib/components/calendar/calendar-entry.svelte'
  import CalendarEvent from '$lib/components/calendar/calendar-event.svelte'
  import { languageStore } from '$lib/stores/language.store'

  export let data: Api.CalendarEntry[]

  const today = getToday()
  const msInDay = 1000 * 60 * 60 * 24
  function daysDiff(date1: Date, date2: Date) {
    return Math.floor(Math.abs(date2.getTime() - date1.getTime()) / msInDay)
  }

  function dateToString(date: Date, locale: string) {
    return date.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric',
    })
  }

  function generateCalendarDays(dates: Date[]) {
    const timestamps = dates.map((date) => date.getTime()).sort((a, b) => a - b)
    const minDate = timestamps.at(0) as number
    const maxDate = timestamps.at(-1) as number

    return Array.from({ length: Math.ceil((maxDate - minDate) / msInDay) + 1 }, (_, index) => {
      return new Date(minDate + index * msInDay)
    })
  }

  let days: Date[]
  $: data = data
    .map((entry) => ({
      ...entry,
      events: entry.events.filter(({ start }) => start.getTime() >= today.getTime()),
    }))
    .filter(({ events }) => events.length > 0)
  $: days = generateCalendarDays(data.map(({ events }) => events.map(({ start, end }) => [start, end])).flat(2))
  $: columns = Array.from(Array(days.length).keys())
  $: minDate = days[0] as Date
</script>

<div role="grid" aria-readonly="true" use:mousescroll style:--rows={data.length} style:--columns={columns.length}>
  <div class="h-12" role="row" style:--index={1}>
    <div role="columnheader">
      <span class="self-end p-2 font-bold uppercase justify-self-center">Paquetes</span>
    </div>
    {#each days as date}
      <div role="columnheader">
        <span class="self-end p-2 font-bold uppercase justify-self-center">
          {dateToString(date, $languageStore.locale)}
        </span>
      </div>
    {/each}
  </div>
  {#each data as entry, rowIndex}
    <div role="row" style:--index={rowIndex + 2}>
      <div role="rowheader" style:--index="1">
        <CalendarEntry data={entry} />
      </div>
      {#each entry.events as event}
        <div
          role="gridcell"
          style:--index={daysDiff(minDate, event.start) + 2}
          style:--span={daysDiff(event.start, event.end) + 1}>
          <CalendarEvent data={event} />
        </div>
      {/each}
      {#each columns as columnIndex}
        <div role="gridcell" style:--index={columnIndex + 2} />
      {/each}
      <div role="gridcell" style:--index={columns.length + 2} />
    </div>
  {/each}
  <div role="row">
    <div role="rowheader" />
    {#each columns as columnIndex}
      <div role="gridcell" style:--index={columnIndex + 2} />
    {/each}
    <div role="gridcell" style:--index={columns.length + 2} />
  </div>
</div>

<style lang="postcss">
  [role='grid'] {
    --first-column-size: 16rem;
    --first-row-size: 48px;
    --column-size: 120px;
    --row-size: 64px;
    --background: theme('colors.canvas.bg');
    display: grid;
    grid-template-rows: var(--first-row-size) repeat(var(--rows), auto) 1fr;
    flex: 1 1 0px;
    cursor: grab;
    background-color: var(--background);
    isolation: isolate;
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    user-select: none;
    @apply scrollbar-thin scrollbar-border-canvas-border scrollbar-canvas-fg/50;
  }

  [role='row'] {
    --index: auto;
    display: grid;
    grid-template-columns: var(--first-column-size) repeat(var(--columns), var(--column-size)) 1fr;
    grid-auto-flow: column;
    grid-row-start: var(--index);
    grid-column-start: 1;

    &:first-child {
      position: sticky;
      top: 0;
      z-index: 2;
      box-shadow: inset 0 -1px theme('colors.canvas.border');
      background-color: theme('colors.canvas.bg');
    }

    & > * {
      --index: auto;
      --span: 1;
      grid-row-start: 1;
      grid-column-start: var(--index);
      grid-column-end: span var(--span);
      box-shadow: inset -1px 0 theme('colors.canvas.border');

      &:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        box-shadow: inset -1px -1px theme('colors.surface-1.border');
        background-color: theme('colors.surface-1.bg');

        &::before {
          position: absolute;
          top: 0;
          left: 100%;
          z-index: -1;
          background-image: linear-gradient(to right, var(--background), 25%, transparent);
          width: 1rem;
          height: 100%;
          pointer-events: none;
          content: '';
        }
      }

      &:not(:first-child) {
        font-size: theme('fontSize.sm');
      }
    }
  }

  [role='columnheader'] {
    display: grid;
  }

  [role='rowheader'] {
    display: grid;
  }

  [role='gridcell'] {
    display: grid;
  }
</style>
