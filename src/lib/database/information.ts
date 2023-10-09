import { DateTime } from 'luxon'
import { mod } from '$core/utils/math'
import type { Api } from '$lib/api'
import { weekdays } from '$lib/constants/calendar'
import { api } from '$lib/services/api'

export async function getInformation(): Promise<Api.Information> {
  const request = api
    .from('information')
    .select(
      `
      contact,
      networks,
      location->coordinates,
      address,
      schedule
    `,
    )
    .returns<
      {
        address: string
        coordinates: [number, number]
        contact: {
          type: string
          value: string
        }[]
        networks: {
          type: string
          value: string
        }[]
        schedule: {
          weekday: string
          start_time: string
          end_time: string
        }[]
      }[]
    >()
    .single()

  const { data, error } = await request
  const timezoneOffset = -7

  if (error) throw error

  return {
    ...data,
    contact: data.contact.filter((item): item is Api.InformationContact => ['phone', 'email'].includes(item.type)),
    networks: data.networks.filter((item): item is Api.InformationNetwork => ['facebook'].includes(item.type)),
    schedule: data.schedule.map((schedule) => mapSchedule(schedule, timezoneOffset)).sort(sortSchedule),
  }
}

function mapSchedule(
  { weekday, start_time, end_time }: { weekday: string; start_time: string; end_time: string },
  timezoneOffset: number,
) {
  if (!isWeekDay(weekday)) throw new Error()

  return {
    weekday,
    start: getDate(start_time, weekdays[weekday], timezoneOffset),
    end: getDate(end_time, weekdays[weekday], timezoneOffset),
  }
}

function sortSchedule(a: Api.InformationSchedule, b: Api.InformationSchedule) {
  return weekdays[a.weekday] - weekdays[b.weekday]
}

function isWeekDay(value: string): value is Api.Weekday {
  return value in weekdays
}

function getDate(time: string, weekday: number, timezoneOffset: number) {
  if (!/^\d\d:\d\d:\d\d$/.test(time)) throw new Error(`Invalid date time '${time}'`)
  if (weekday < 1 || weekday > 7) throw new Error(`Invalid weekday '${weekday}'`)

  const [hour, minute, second] = time.split(':').map(Number) as [number, number, number]
  const today = DateTime.now()
    .setZone(`UTC${timezoneOffset < 0 ? '-' : '+'}${Math.abs(timezoneOffset)}`)
    .set({ hour, minute, second, millisecond: 0 })

  return today.plus({ days: mod(weekday - today.weekday, 7) }).toJSDate()
}
