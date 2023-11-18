<script lang="ts">
  import { breakpoints } from '$core/constants/breakpoints'
  import backgroundLgJpeg from './services-1-lg.png?format=jpg&as=url'
  import backgroundLgWebp from './services-1-lg.png?format=webp&as=url'
  import backgroundSmJpeg from './services-1-sm.png?format=jpg&as=url'
  import backgroundSmWebp from './services-1-sm.png?format=webp&as=url'
</script>

<section>
  <picture>
    <source srcset={backgroundSmWebp} type="image/webp" media="(max-width: {breakpoints.sm}px)" />
    <source srcset={backgroundSmJpeg} type="image/jpeg" media="(max-width: {breakpoints.sm}px)" />
    <source srcset={backgroundLgWebp} type="image/webp" />
    <img src={backgroundLgJpeg} alt="" loading="lazy" />
  </picture>
  <p>
    Contamos con más de <strong>15 años de experiencia</strong> en la operación, programación y comercialización de todo
    tipo de servicios turísticos.
  </p>
</section>

<style lang="postcss">
  section {
    --image-size: 720px;
    --container-size: theme('screens.sm');
    display: grid;
    position: relative;
    grid-template: 'stack' 100% / 100%;
    width: 100%;
    height: var(--container-size);

    & > * {
      grid-area: stack;
    }
  }

  picture {
    &::after {
      position: absolute;
      opacity: 0.7;
      mix-blend-mode: multiply;
      inset: 0;
      background-image: radial-gradient(rgb(0 0 0 / 75%) 1px, transparent 1px);
      background-size: 4px 4px;
      background-color: theme('colors.canvas.bg/75%');
      pointer-events: none;
      content: '';
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: none;
    object-position: center;
    animation-timeline: view(y 10%);
    animation-duration: 1ms;
    animation-timing-function: linear;
    animation-fill-mode: both;
    animation-name: parallax;
  }

  @keyframes parallax {
    from {
      /* transform: scaleX(0); */
      object-position: center calc(calc(var(--image-size) - var(--container-size)) * -1);
    }

    to {
      /* transform: scaleX(1); */
      object-position: center 0px;
    }
  }

  p {
    place-self: center;
    z-index: 1;
    padding-inline: theme('spacing.4');
    max-width: theme('screens.md');
    font-size: theme('fontSize.xl-fluid[0]');
    line-height: theme('fontSize.xl-fluid[1]');
    font-family: theme('fontFamily.display');
    text-align: center;
    text-wrap: balance;
    color: hsl(172 20% 90%);

    strong {
      border-radius: theme('borderRadius.DEFAULT');
      background-color: hsl(172 38% 45%);
      padding-inline: theme('spacing.3');
      padding-block: theme('spacing.1');
      white-space: nowrap;
    }
  }
</style>
