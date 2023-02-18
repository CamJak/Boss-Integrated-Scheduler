
<script lang="ts">
  import type { PageServerData } from "../$types";
  
  export let data: PageServerData;
  // still trying to figure out why typescript is being so anal about these types
</script>

<h1 class="dark:text-white">{data?.message}</h1>

{#each data?.subjects as subject}
  <p class="dark:text-white text-sm">{subject.name}</p>
{/each}
