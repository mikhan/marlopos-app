declare namespace App {
  // import type { Language } from '$lib/constants'
  // interface Locals {
  //   language: Language
  // }
  // interface PageData {
  // language: Language
  // }
}

declare module '*.svg?component' {
  import type { ComponentType, SvelteComponentTyped } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'

  const content: ComponentType<SvelteComponentTyped<SVGAttributes<SVGSVGElement>>>

  export default content
}

declare module '*.svg?src' {
  const content: string
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare module '*.svg?dataurl' {
  const content: string
  export default content
}
