<script lang="ts">
  import { mousescroll } from '$core/actions/mousescroll'
  import CalendarEntry from '$lib/components/calendar/calendar-entry.svelte'
  import CalendarEvent from '$lib/components/calendar/calendar-event.svelte'
  import { languageStore } from '$lib/stores/language.store'

  export let data: Api.CalendarEntry[]

  const today = new Date()
  today.setUTCHours(0)
  today.setUTCMinutes(0)
  today.setUTCSeconds(0)
  today.setUTCMilliseconds(0)

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
    const minDate = timestamps.at(0)!
    const maxDate = timestamps.at(-1)!

    return Array.from({ length: Math.ceil((maxDate - minDate) / msInDay) + 1 }, (_, index) => {
      return new Date(minDate + index * msInDay)
    })
  }

  const days = generateCalendarDays(data.map(({ events }) => events.map(({ start, end }) => [start, end])).flat(2))
</script>

<div role="grid" aria-readonly="true" use:mousescroll>
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
      {#each days as _, columnIndex}
        <div role="gridcell" style:--index={columnIndex + 2} />
      {/each}
      {#each entry.events as event}
        <div
          role="gridcell"
          style:--index={daysDiff(today, event.start) + 2}
          style:--span={daysDiff(event.start, event.end) + 1}>
          <CalendarEvent data={event} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="postcss">
  [role='grid'] {
    --first-column-size: 16rem;
    --first-row-size: 48px;
    --column-size: 120px;
    --row-size: 64px;
    --background: theme('colors.canvas.bg');
    display: grid;
    width: 100%;
    height: 100%;
    flex: 1 1 0px;
    background-color: var(--background);
    overflow: auto;
    scroll-behavior: smooth;
    user-select: none;
    isolation: isolate;
    @apply scrollbar-thin scrollbar-border-canvas-border scrollbar-canvas-fg/50;
  }

  [role='row'] {
    --index: auto;
    grid-column-start: 1;
    grid-row-start: var(--index);
    display: grid;
    grid-template-columns: var(--first-column-size);
    grid-auto-columns: var(--column-size);
    grid-auto-flow: column;

    &:first-child {
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: theme('colors.canvas.bg');
      box-shadow: inset 0 -1px theme('colors.canvas.border');
    }

    & > * {
      --index: auto;
      --span: 1;
      grid-column-start: var(--index);
      grid-column-end: span var(--span);
      grid-row-start: 1;
      box-shadow: inset -1px 0 theme('colors.canvas.border');

      &:first-child {
        background-color: theme('colors.surface-1.bg');
        box-shadow: inset -1px -1px theme('colors.surface-1.border');
        position: sticky;
        left: 0;
        z-index: 1;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 100%;
          width: 1rem;
          height: 100%;
          pointer-events: none;
          background-image: linear-gradient(to right, var(--background), 25%, transparent);
          z-index: -1;
        }
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
    cursor: grab;
  }
</style>
