declare namespace App {
  interface PageData {
    metadata: Metadata
  }

  interface Error {
    message: string
  }

  interface Metadata {
    title: string
    description: string
    lang: string
    links: Link[]
    preconnect: string[]
  }

  type Link = LinkAlternate | LinkCanonical

  interface LinkAlternate {
    rel: 'alternate'
    href: string
    hreflang: string
  }

  interface LinkCanonical {
    rel: 'canonical'
    href: string
    href: string
  }
}
