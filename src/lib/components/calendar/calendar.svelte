<script lang="ts">
  export let data: Api.CalendarEvent[]
  //   console.log(data)

  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
  data = data.filter(({ start }) => start.getTime() > today.getTime())

  const maxDate = data.reduce((current, next) => {
    return next.end.getTime() > current.end.getTime() ? next : current
  }).end

  let current = new Date(minDate)
  const calendar: { date: Date; events: (Api.CalendarEvent | null)[] }[] = []
  let i = 0
  let maxColumns = 0
  const row: (Api.CalendarEvent | null)[] = []

  //   const toString = (date: Date) => date.toJSON().slice(0, 10).replaceAll('-', '')
  const intl = new Intl.DateTimeFormat(['es'], { year: '2-digit', month: '2-digit', day: '2-digit' })
  const toString = (date: Date) => intl.format(date)
  const eventToString = (event: Api.CalendarEvent | null) =>
    event === null ? '%c                 ' : `%c${toString(event.start)}|${toString(event.end)}`
  const evenStyles = (event: Api.CalendarEvent | null) =>
    `background:${event?.color ?? ''};color:black;margin:0 2px;padding:0 2px;`
  console.clear()

  while (current.getTime() < maxDate.getTime()) {
    i++

    const endEvents = data.filter(({ end }) => end.getTime() === current.getTime())
    for (const event of endEvents) {
      const index = row.indexOf(event)
      row.splice(index, 1, null)
    }

    current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)

    console.groupCollapsed(toString(current))

    if (endEvents.length) {
      console.log('- ' + endEvents.map(eventToString).join(''), ...endEvents.map(evenStyles))
      console.log(row.map(eventToString).join(''), ...row.map(evenStyles))
    }

    const startEvents = data.filter(({ start }) => start.getTime() === current.getTime())
    for (const event of startEvents) {
      const index = row.findIndex((event) => event === null)
      row.splice(index === -1 ? row.length : index, 1, event)
    }

    while (row.at(-1) === null) {
      row.splice(row.length - 1, 1)
    }

    if (startEvents.length) {
      console.log('+ ' + startEvents.map(eventToString).join(''), ...startEvents.map(evenStyles))
      console.log(row.map(eventToString).join(''), ...row.map(evenStyles))
    }
    console.groupEnd()
    // console.log(toString(current), row.length, { start: startEvents.length, end: endEvents.length })
    // console.log(row.map(eventToString))

    calendar.push({
      date: current,
      events: [...row],
    })
    maxColumns = Math.max(maxColumns, row.length)
  }

  //   console.log(data.map(eventToString).join('\n'))

  //   for (const { date, events } of calendar) {
  //     console.log(toString(date), events.map(eventToString).join(' - '))
  //   }
  //   console.log(calendar)
  //   console.log(maxColumns)
  const dayMs = 1000 * 60 * 60 * 24
  const getDayDif = (start: Date, end: Date) => Math.round((end.getTime() - start.getTime()) / dayMs) + 1
  console.log(data)
</script>

<div class="flex flex-col">
  {#each calendar as { date, events }}
    <div class="grid h-12 gap-2" style:grid-template-columns={`100px repeat(${maxColumns}, 1fr)`}>
      <div>{date.toLocaleString(undefined, { dateStyle: 'short' })}</div>
      {#each events as event}
        {#if event && event.start.getTime() === date.getTime()}
          <div class="relative">
            <div class="absolute w-full py-2" style:height={getDayDif(event.start, event.end) * 48 + 'px'}>
              <div class="h-full px-2 text-black rounded-md" style:background-color={event.color}>
                <div>{getDayDif(event.start, event.end)}</div>
              </div>
            </div>
          </div>
        {:else}
          <div />
        {/if}
      {/each}
    </div>
    <hr class="-mb-px text-surface-1-border" />
  {/each}
</div>
