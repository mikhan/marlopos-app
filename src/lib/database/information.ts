import { mod } from '$core/utils/math'
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

  if (error) throw error

  return {
    ...data,
    contact: data.contact.filter((item): item is Api.InformationContact => ['phone', 'email'].includes(item.type)),
    networks: data.networks.filter((item): item is Api.InformationNetwork => ['facebook'].includes(item.type)),
    schedule: data.schedule.map(mapSchedule).sort(sortSchedule),
  }
}

const mapSchedule = ({ weekday, start_time, end_time }: { weekday: string; start_time: string; end_time: string }) => {
  if (!isWeekDay(weekday)) throw new Error()

  return {
    weekday,
    start: getDate(start_time, 7, weekdays[weekday]),
    end: getDate(end_time, 7, weekdays[weekday]),
  }
}

const sortSchedule = (a: Api.InformationSchedule, b: Api.InformationSchedule) =>
  weekdays[a.weekday] - weekdays[b.weekday]

const isWeekDay = (value: string): value is Api.Weekday => value in weekdays

const getDate = (time: string, timezoneOffset: number, weekday: number) => {
  const today = new Date()
  const todayDate = today.toJSON().substring(0, 10)
  const todayWeekday = today.getUTCDay()
  const timeOffset = timezoneOffset * 60 * 60 * 1000
  const weekdayOffset = mod(weekday - todayWeekday, 7) * 24 * 60 * 60 * 1000

  return new Date(Date.parse(`${todayDate}T${time}.000Z`) + timeOffset + weekdayOffset)
}
