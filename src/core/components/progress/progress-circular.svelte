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
    position: relative;
    container: ui-progress-circular / size;
    border-radius: 50%;
    width: 48px;
    height: 48px;

    .circle {
    }

    .mask,
    .fill {
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    .fill {
      border: var(--border);
    }

    .mask.full,
    .fill {
      transform: rotate(var(--degrees));
      animation: ui-progress-circular-animation linear var(--duration) infinite;
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
      display: grid;
      position: absolute;
      place-content: center;
      inset: 0;
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
