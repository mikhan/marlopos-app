import type { Api } from '$lib/api'
import { api } from '../services/api'
import type { Language } from '../utils/language'

export async function getCalendarEvents(options: { language: Language }): Promise<Api.CalendarEntry[]> {
  const { data, error } = await api
    .from('package_translations')
    .select(
      `
      id,
      name,
      description,
      package (
        package_schedule (
          start,
          end
        )
      )`,
    )
    .eq('languages_code', options.language.locale)
    .throwOnError()
    .returns<
      {
        id: string
        name: string
        description: string
        package: {
          package_schedule: {
            start: string
            end: string
          }[]
        }
      }[]
    >()

  if (error) throw error

  return data.map(({ id, name, description, package: { package_schedule } }) => ({
    id,
    name,
    description,
    events: package_schedule.map(({ start, end }) => ({ id, name, start: new Date(start), end: new Date(end) })),
  }))
}
