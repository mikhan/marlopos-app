<script lang="ts">
  import Calendar from '$lib/components/calendar/calendar.svelte'
  import { PseudoRandom } from '$lib/services/pseudo-random'
  // import type { PageData } from './$types'

  // export let data: PageData
  const startDate = new Date('2023-08-28T00:00:00').getTime()

  const rnd = new PseudoRandom(5)
  const dayMs = 1000 * 60 * 60 * 24
  let id = 0
  function createEvents(color: string, name: string, length: number) {
    const eventLength = rnd.nextRange(3, 15) * dayMs
    const eventGap = rnd.nextRange(4, 15) * dayMs
    let date = startDate + rnd.nextRange(0, 10) * dayMs

    return Array.from({ length }, () => {
      id++
      const start = new Date(date)
      date += eventLength
      const end = new Date(date)
      date += eventGap
      return { color, id: id.toString(), name, start: new Date(start), end: new Date(end) }
    })
  }

  const data = {
    calendarEvents: [
      createEvents('#ff6b6b', 'Nisi ullamco nulla ad non cupidatat exercitation.', rnd.nextRange(4, 12)),
      createEvents('#f06595', 'Do duis eiusmod consequat occaecat sit.', rnd.nextRange(4, 12)),
      createEvents('#cc5de8', 'Consectetur excepteur occaecat ullamco aliqua est.', rnd.nextRange(4, 12)),
      createEvents('#845ef7', 'Aliquip reprehenderit quis nostrud amet anim nostrud.', rnd.nextRange(4, 12)),
      createEvents('#339af0', 'Officia exercitation deserunt deserunt fugiat.', rnd.nextRange(4, 12)),
      createEvents('#20c997', 'Adipisicing sint culpa irure ad excepteur pariatur.', rnd.nextRange(4, 12)),
      createEvents('#94d82d', 'Pariatur eu do laborum culpa cupidatat amet cillum.', rnd.nextRange(4, 12)),
      createEvents('#fcc419', 'Sit laboris veniam dolor minim.', rnd.nextRange(4, 12)),
      createEvents('#ff922b', 'Tempor aliqua culpa nostrud ad quis elit elit proident sunt.', rnd.nextRange(4, 12)),
    ]
      .flat()
      .sort((a, b) => a.start.getTime() - b.start.getTime()),
  }
</script>

<Calendar data={data.calendarEvents} />
