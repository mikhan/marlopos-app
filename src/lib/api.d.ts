export namespace Api {
  export type Package = {
    id: string
    name: string
    description: string
    content: string
    cover: Image
    schedule: PackageSchedule[]
    destinations: Destination[]
  }

  export type PackageSchedule = {
    start: Date
    end: Date
  }

  export type Destination = {
    id: string
    name: string
    description: string
    cover: Image
    //photos: Image[]
    coordinates: [lng: number, lat: number]
  }

  export type Image = {
    id: string
    title: string
    width: number
    height: number
    blurhash: string
    color: string
  }

  export type Banner = {
    id: string
    name: string
    description: string
    cover: Image
  }

  export type CountryPreview = {
    id: number
    name: string
    destinations: 1
    packages: number
    href: string
    cover: Image
  }

  export type CalendarEntry = {
    id: string
    name: string
    description: string
    events: CalendarEvent[]
  }

  export type CalendarEvent = {
    start: Date
    end: Date
  }

  export type Information = {
    address: string
    coordinates: [number, number]
    contact: InformationContact[]
    networks: InformationNetwork[]
    schedule: InformationSchedule[]
  }

  export type InformationContact = {
    type: 'phone' | 'email'
    value: string
  }

  export type InformationNetwork = {
    type: 'facebook'
    value: string
  }

  export type InformationSchedule = {
    weekday: Weekday
    start: Date
    end: Date
  }

  export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
}
