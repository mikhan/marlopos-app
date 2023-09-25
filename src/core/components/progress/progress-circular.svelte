<script lang="ts">
  export let duration = 1000
  export let progress = 1
</script>

<div data-component="ui-progress-circular" style:--degrees={`${progress * 180}deg`} style:--duration={`${duration}ms`}>
  <div class="circle">
    <div class="mask half">
      <div class="fill" />
    </div>
    <div class="mask full">
      <div class="fill" />
    </div>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  :global([data-component='ui-progress-circular']) {
    --degrees: 360deg;
    --duration: 1000ms;
    --border: 6px solid #227ded;
    container: ui-progress-circular / size;
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;

    .circle {
    }

    .mask,
    .fill {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 50%;
    }
    .fill {
      border: var(--border);
    }

    .mask.full,
    .fill {
      animation: ui-progress-circular-animation linear var(--duration) infinite;
      transform: rotate(var(--degrees));
    }

    @container ui-progress-circular (min-width: 0px) {
      .mask .fill {
        clip: rect(0px, 50cqw, 100cqh, 0px);
      }

      .circle .mask {
        clip: rect(0px, 100cqw, 100cqh, 50cqw);
      }
    }

    .content {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
    }

    @keyframes ui-progress-circular-animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(var(--degrees));
      }
    }
  }
</style>
