export interface FeaturedPackage {
  id: string
  name: string
  description: string
  url: string
  cover: {
    id: string
    title: string
    url: string
    width: number
    height: number
    blurhash: string
  }
}
