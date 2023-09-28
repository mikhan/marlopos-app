<script lang="ts">
  import type { Api } from '$lib/api'
  import { languageStore } from '$lib/stores/language.store'

  export let data: Api.CalendarEvent
  let dates: string[]
  $: dates = getDates(data.start, data.end, $languageStore.locale)

  function getDates(start: Date, end: Date, locale: string) {
    const dates: string[] = []

    dates.push(dateToString(start, locale))

    if (start.getTime() !== end.getTime()) {
      dates.push(dateToString(end, locale))
    }

    return dates
  }

  function dateToString(date: Date, locale: string) {
    return date.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    })
  }
</script>

<div>
  {#each dates as date}
    <span>{date}</span>
  {/each}
</div>

<style lang="postcss">
  div {
    --color: theme('colors.surface-1.fg');
    --background: theme('colors.surface-1.bg');
    --margin: theme('spacing.2');
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color);
    background-color: var(--background);
    border-radius: theme('borderRadius.lg');
    margin: var(--margin);
    align-self: center;
    isolation: isolate;
  }

  span {
    position: sticky;
    padding: theme('spacing.2') theme('spacing.3');

    &:first-child:not(:last-child) {
      left: calc(var(--first-column-size));
    }

    &:last-child:not(:first-child) {
      right: 0;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to right, transparent, var(--background) theme('spacing.4'));
        z-index: -1;
        border-radius: theme('borderRadius.lg');
      }
    }
  }
</style>
