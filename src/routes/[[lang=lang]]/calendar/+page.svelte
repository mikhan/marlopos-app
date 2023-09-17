<script lang="ts">
  import Calendar from '$lib/components/calendar/calendar.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<Calendar data={data.calendarEvents} />
