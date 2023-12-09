<script lang="ts">
  import type { Api } from '$lib/api'
  import { languageStore } from '$lib/stores/language.store'
  import type { Language } from '$lib/utils/language'

  const currentYear = new Date().getFullYear()
  export let data: Api.Package
  $: details = getDetails(data, $languageStore)

  function getDetails(data: Api.Package, language: Language) {
    const now = new Date().getTime()
    const schedule = data.schedule.filter(({ start }) => start.getTime() > now)[0] ?? null

    return {
      price: formatPrize(data.price),
      schedule: schedule && {
        departure: dateToString(schedule.start, language),
        arrival: dateToString(schedule.end, language),
        duration: daysDiff(schedule.start, schedule.end, language),
      },
    }
  }

  function dateToString(date: Date, language: Language) {
    return date.toLocaleDateString(language.locale, {
      year: currentYear !== date.getFullYear() ? 'numeric' : undefined,
      month: 'long',
      day: 'numeric',
    })
  }

  const intl = {
    es: { one: 'día', many: 'días' },
    en: { one: 'day', many: 'days' },
  }

  function formatPrize(prize: string): string | null {
    const match = prize.match(/([0-9.,]+) *([a-z]{3})/i) as [string, string, string] | null
    if (!match) return prize || null

    const value = Number.parseFloat(match[1].replaceAll(',', ''))
    const currency = match[2]

    try {
      prize = Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(value)
    } catch {}

    return prize
  }

  function daysDiff(start: Date, end: Date, language: Language) {
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24) + 1
    const plurale = new Intl.PluralRules(language.locale, { type: 'ordinal' })
    const lang = language.code === 'es' ? 'es' : 'en'

    return `${diff} ${intl[lang][plurale.select(diff) === 'one' ? 'one' : 'many']}`
  }
</script>

<dl>
  {#if details.price}
    <div>
      <dt>Precio</dt>
      <dd>{details.price}</dd>
    </div>
  {/if}
  {#if details.schedule}
    <div>
      <dt>Salida</dt>
      <dd>{details.schedule.departure}</dd>
    </div>
    <div>
      <dt>Regreso</dt>
      <dd>{details.schedule.arrival}</dd>
    </div>
    <div>
      <dt>Duración</dt>
      <dd>{details.schedule.duration}</dd>
    </div>
  {:else}
    <div>
      <dt>Salida</dt>
      <dd>No hay salidas programadas</dd>
    </div>
  {/if}
</dl>

<style lang="postcss">
  dl {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(theme('spacing.64'), 1fr));
    gap: theme('spacing.6') theme('spacing.2');
    box-shadow: theme('elevation.low');
    border-radius: theme('borderRadius.DEFAULT');
    background-color: theme('colors.surface-1.bg');
    padding: theme('spacing.4');
    min-width: theme('spacing.64');
    color: theme('colors.surface-1.fg');

    @media (min-width: theme('screens.lg')) {
      grid-template-columns: theme('spacing.64');
      padding-inline: theme('spacing.6');
    }
  }

  dt {
    font-weight: bold;
    font-size: theme('fontSize.xs[0]');
    line-height: theme('fontSize.xs[1]');
    letter-spacing: theme('letterSpacing.widest');
    text-transform: uppercase;
  }

  dd {
    margin-block-start: theme('spacing.1');
    font-size: theme('fontSize.lg[0]');
    line-height: theme('fontSize.lg[1]');
  }
</style>
