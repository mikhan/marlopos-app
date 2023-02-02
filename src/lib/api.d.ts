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
}
