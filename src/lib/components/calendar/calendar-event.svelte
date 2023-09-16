<script lang="ts">
  import { today } from '$core/constants/today'
  import { languageStore } from '$lib/stores/language.store'

  export let data: Api.CalendarEvent

  function dateToString(date: Date, locale: string) {
    return date.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric',
    })
  }
</script>

<div>
  <span>{dateToString(data.start, $languageStore.locale)}</span>
  <span>{dateToString(data.end, $languageStore.locale)}</span>
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
    font-size: theme('fontSize.sm');
    line-height: 1;
    margin: var(--margin);
    align-self: center;

    /* &:hover {
      --color: theme('colors.surface-primary.fg');
      --background: theme('colors.surface-primary.bg');
    } */

    & > * {
      position: sticky;
      padding: theme('spacing.3') theme('spacing.4');
    }

    & > :first-child {
      left: calc(var(--first-column-size));
    }

    & > :last-child {
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
