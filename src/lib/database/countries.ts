import { unique } from '$core/utils/array'
import { api } from '$lib/services/api'

export async function getCountriesPreview() {
  const request = api
    .from('country')
    .select(
      `
      id,
      name,
      destinations:destination!inner (id, cover!inner (
        id:filename_disk,
        title,
        width,
        height,
        blurhash
      )),
      packages:destination!inner (_:package_destination(package (id)))
    `,
    )
    .returns<
      {
        id: number
        name: string
        destinations: [
          {
            id: number
            cover: Database.Image
          },
        ]
        packages: { _: { package: { id: string } }[] }[]
      }[]
    >()

  const { data, error } = await request

  if (error) throw error

  return data.map(({ id, name, destinations, packages }) => ({
    id,
    name,
    cover: destinations[0].cover,
    destinations: destinations.length,
    packages: unique(packages.flatMap(({ _ }) => _.map(({ package: { id } }) => id))).length,
    href: `/country/${id}`,
  }))
}
