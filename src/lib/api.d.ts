declare namespace Api {
  type Resource = {
    meta: Metadata
    [K in string]: unknown
  }

  type Metadata = {
    title: string
    description: string
    lang: string
    links: Link[]
  }

  type Link = LinkAlternate | LinkCanonical

  type LinkAlternate = {
    rel: 'alternate'
    href: string
    hreflang: string
  }

  type LinkCanonical = {
    rel: 'canonical'
    href: string
    href: string
  }
  type Package = {
    id: string
    name: string
    description: string
    content: string
    cover: Image
    schedule: InformationSchedule[]
    destinations: Destination[]
  }

  type Destination = {
    id: string
    name: string
    description: string
    cover: Image
    //photos: Image[]
    coordinates: [lng: number, lat: number]
  }

  type Image = {
    id: string
    title: string
    width: number
    height: number
    blurhash: string
    color: string
  }

  type Banner = {
    id: string
    name: string
    description: string
    cover: Image
  }

  type CountryPreview = {
    id: number
    name: string
    destinations: 1
    packages: number
    href: string
    cover: Image
  }

  type CalendarEvent = {
    id: string
    color: string
    name: string
    start: Date
    end: Date
  }

  type Information = {
    address: string
    coordinates: [number, number]
    contact: InformationContact[]
    networks: InformationNetwork[]
    schedule: InformationSchedule[]
  }

  type InformationContact = {
    type: 'phone' | 'email'
    value: string
  }

  type InformationNetwork = {
    type: 'facebook'
    value: string
  }

  type InformationSchedule = {
    weekday: Weekday
    start: Date
    end: Date
  }

  type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
}
