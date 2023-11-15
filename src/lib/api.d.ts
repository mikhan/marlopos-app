export namespace Api {
  export type Package = {
    id: string
    name: string
    price: string
    description: string
    content: string
    notes: string
    cover: Image
    schedule: PackageSchedule[]
    destinations: PackageDestination[]
    gallery: PackageThumbnail[]
    attachments: PackageAttachment[]
  }

  export type PackageThumbnail = {
    type: 'image' | 'video'
    id: string
    title: string
  }

  export type PackageSchedule = {
    start: Date
    end: Date
  }

  export type PackageDestination = {
    days: number | null
    nights: number | null
  } & Destination

  export type PackageAttachment = {
    id: string
    title: string
    type: string
    filename: string
    filesize: number
  }

  export type Destination = {
    id: string
    name: string
    description: string
    cover: Image
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
    type: string
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
