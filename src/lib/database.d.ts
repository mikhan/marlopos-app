declare namespace Database {
  type Image = {
    id: string
    title: string
    blurhash: string
  }

  type Package = {
    slug: string
    name: string
    description: string
    cover: Image
  }
}
