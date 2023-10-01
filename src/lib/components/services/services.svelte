<script lang="ts">
  import type { Action } from 'svelte/action'
  import Image from '$core/components/image.svelte'
  import { clamp } from '$core/utils/math'
  import background from '$lib/assets/services-1.jpg'

  const parallax: Action<HTMLElement> = (element) => {
    const abortController = new AbortController()
    let active = false

    function onScroll() {
      const limit = element.clientHeight + window.innerHeight
      const offset = window.scrollY - (element.offsetTop - window.innerHeight)
      const position = clamp(0, 1, offset / limit)
      element.style.setProperty('--parallax-position', String(position))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || active === entry.isIntersecting) return

        active = entry.isIntersecting

        if (active) {
          window.addEventListener('scroll', onScroll, { signal: abortController.signal })
        } else {
          window.removeEventListener('scroll', onScroll)
        }
      },
      { threshold: [0, 1] },
    )

    observer.observe(element)
    abortController.signal.onabort = () => {
      observer.disconnect()
    }

    return {
      destroy: () => abortController.abort(),
    }
  }
</script>

<article use:parallax>
  <picture>
    <Image src={background} alt="" class="w-full h-full" fit="cover" width={1280} height={720} />
  </picture>
  <p class="leading-relaxed text-center text-white text-balance text-xl-fluid font-display">
    Contamos con más de <strong class="bg-[hsl(172_38%_46%)] px-3 py-1 rounded whitespace-nowrap"
      >15 años de experiencia</strong> en la operación, programación y comercialización de todo tipo de servicios turísticos.
  </p>
</article>

<style lang="postcss">
  article {
    --parallax-offset: calc(864px - theme('screens.sm'));
    --parallax-position: 0px;
    position: relative;
    display: grid;
    place-content: center;
    width: 100%;
    height: theme('screens.sm');
    padding-inline: theme('spacing.4');
    overflow: hidden;
  }

  picture {
    --offset: calc(var(--parallax-offset) * var(--parallax-position));
    position: absolute;
    inset: 0;
    top: calc(var(--parallax-offset) * -1);
    transform: translateY(var(--offset));
    transition: transform 50ms linear;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.7;
      background-color: theme('colors.canvas.bg/75%');
      background-image: radial-gradient(rgb(0 0 0 / 75%) 1px, transparent 1px);
      background-size: 4px 4px;
      mix-blend-mode: multiply;
      pointer-events: none;
    }
  }

  p {
    max-width: theme('screens.md');
    z-index: 1;
  }
</style>
