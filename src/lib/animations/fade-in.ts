export function fadeIn(image: HTMLImageElement) {
  if (image.complete) return

  image.style.setProperty('opacity', '0')
  image.style.setProperty('transition', 'opacity 1s ease-in')
  image.addEventListener('load', () => image.style.removeProperty('opacity'))
}
