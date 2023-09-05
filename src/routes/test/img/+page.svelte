<script lang="ts">
  import Blurhash from '$core/components/blurhash.svelte'
  import Image from '$core/components/image.svelte'

  const width = 1600
  const height = 1049
  const src = '/api/assets/seo/24d1c755-ba26-429a-b2ee-c7e67cf6ac4d/Cuba1.jpg.jpg'
  const color = '#959569'
  const hash =
    ':AHC0+r?RWIo~qWnI;?H4YbDb[M|9Gj]jENH00XR9Gxb4oRlxbNF%g%2D*NH_2ou.6sp%NR%?ani-pRkM|WVD*Rj?at7M{oxNFWCM{t6R%M|IUt7oMbFs,WVIUs:ofWnR+of'
</script>

<picture class="max-w-md">
  <Image {src} alt="Totle" {width} {height} {color} fit="cover">
    <Blurhash class="object-cover w-full h-full" {hash} {width} {height} />
  </Image>
</picture>

<picture class="max-w-md">
  <Image src={src + '?w=' + width / 10} alt="Totle" width={width / 10} height={height / 10} {color} fit="cover">
    <Blurhash class="object-cover w-full h-full" {hash} {width} {height} />
  </Image>
</picture>

<picture class="w-40 h-80">
  <Image {src} alt="Totle" {width} {height} {color} fit="none">
    <Blurhash class="object-cover w-full h-full" {hash} {width} {height} />
  </Image>
</picture>

<picture class="w-40 h-80">
  <Image src={src + '?w=' + width / 10} alt="Totle" width={width / 10} height={height / 10} {color} fit="none">
    <Blurhash class="object-cover w-full h-full" {hash} {width} {height} />
  </Image>
</picture>

<style lang="postcss">
</style>
