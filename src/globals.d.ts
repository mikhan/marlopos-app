type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown

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

declare module '*&imgs' {
  const content: string[]
  export default content
}

declare module '*&as=url' {
  const content: string
  export default content
}

declare module '*&as=picture' {
  const content: {
    img: { src: string; w: number; h: number }
    sources: { [type: string]: { src: string; w: number }[] }
  }
  export default content
}

declare module '*&as=source' {
  const content: { src: string; w: number }
  export default content
}

declare module '*&as=srcset' {
  const content: string
  export default content
}
