import { api } from '$lib/services/api'

export interface ContactInformation {
  type: 'phone' | 'email'
  value: string
}

export interface ContactNetwork {
  type: 'facebook'
  value: string
}

export interface Schedule {
  weekday: string
  start_time: string
  end_time: string
}

export interface Information {
  address: string
  coordinates: [number, number]
  contact: ContactInformation[]
  networks: ContactNetwork[]
  schedule: Schedule[]
}

export async function getInformation(): Promise<Information> {
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
    .returns<Information>()
    .single()

  const { data, error } = await request

  if (error) throw error

  return data
}
