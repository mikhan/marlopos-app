import { unique } from '$core/utils/array'
import { api } from '$lib/services/api'

export interface CountryPreview {
  id: number
  name: string
  cover: Database.Image & { src: string }
  destinations: number
  packages: number
  href: string
}

function setCoverSrc<T extends { id: string; title: string }>(cover: T): T & { src: string } {
  return { ...cover, src: cover.id + '/' + encodeURI(cover.title.replace(/ /g, '-')) }
}

export async function getCountriesPreview(): Promise<CountryPreview[]> {
  const request = api
    .from('country')
    .select(
      `
      id,
      name,
      destinations:destination!inner (id, cover!inner (
        id,
        title,
        blurhash
      )),
      packages:destination!inner (_:package_destination(package (id)))
    `,
    )
    .returns<{
      id: number
      name: string
      destinations: [
        {
          id: number
          cover: Database.Image
        },
      ]
      packages: { _: { package: { id: string } }[] }[]
    }>()

  const { data, error } = await request

  if (error) throw error

  return data.map(({ id, name, destinations, packages }) => ({
    id,
    name,
    cover: setCoverSrc(destinations[0].cover),
    destinations: destinations.length,
    packages: unique(packages.flatMap(({ _ }) => _.map(({ package: { id } }) => id))).length,
    href: `/country/${id}`,
  }))
}
