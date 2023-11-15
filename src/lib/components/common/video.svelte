<script lang="ts">
  export let id: string
  export let title = ''
  export let autoPlay: boolean = false
  export let skipTo = { h: 0, m: 0, s: 0 }

  const { h, m, s } = skipTo

  const tH = h * 60 * 60
  const tM = m * 60

  const startTime = tH + tM + s

  const src = `https://www.youtube.com/embed/${id}?autoplay=${autoPlay}&start=${startTime}`
</script>

<iframe
  data-component="ui-video"
  {...$$restProps}
  {src}
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen />
