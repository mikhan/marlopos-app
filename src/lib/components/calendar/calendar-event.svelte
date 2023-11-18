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
    justify-content: space-between;
    align-items: center;
    align-self: center;
    margin: var(--margin);
    border-radius: theme('borderRadius.lg');
    background-color: var(--background);
    isolation: isolate;
    color: var(--color);
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
        position: absolute;
        z-index: -1;
        inset: 0;
        border-radius: theme('borderRadius.lg');
        background-image: linear-gradient(to right, transparent, var(--background) theme('spacing.4'));
        content: '';
      }
    }
  }
</style>
