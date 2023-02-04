<script lang="ts">
  import type { Information } from '$lib/database/information'

  const currentYear = new Date().getFullYear()

  export let data: Information
  console.log(data)
</script>

<footer class="layout mt-auto pt-8 pb-16 bg-neutral-200 text-neutral-400 border-t border-t-neutral-300">
  <div class="text-sm">
    © {currentYear} VIAJES MARLOPOS SA DE CV.
  </div>
</footer>
