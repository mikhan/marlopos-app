declare namespace Database {
  interface Package {
    id: string
    name: string
    description: string
    cover: Image
  }

  interface Destination {
    id: string
    cover: Image
    photos: Image[]
    // coordinates:
  }

  interface Image {
    id: string
    title: string
    blurhash: string
  }
}
