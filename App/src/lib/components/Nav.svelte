<script lang="ts">
	import { page } from '$app/stores';
  import quarter from '$lib/stores/quarter';
  import type { QuarterStoreType } from '$lib/models/quarters';
	import schedule from '$lib/stores/schedule';

  export let quarters: QuarterStoreType[];
  let selectedQuarter = $quarter;

	let showRecentLink = false;

	schedule.subscribe((value) => {
		if (value !== '[]') {
			showRecentLink = true;
		} else {
			showRecentLink = false;
		}
	});
</script>

<div class="sm:hidden dark:text-white">
	This is the navbar for mobile. It should have a drawer/dropdown type icon
</div>
<div class="hidden dark:text-white sm:flex flex-row px-2 {$page.route.id === '/' ? 'py-2' : ''} items-center justify-between">
	<!-- Mobile -->
	<!-- LEFT BIT -->
  {#if $page.route.id === "/"}
    <select class="cursor-pointer hover:bg-gray-800 rounded-lg dark:bg-gray-700 px-2 py-1" placeholder="Quarter">
      {#each quarters as q}
        {#if q.year === $quarter?.year && q.season === $quarter.season}
          <option class="cursor-pointer" selected={true} value={q}>{q.season} {q.year}</option>
        {:else}
          <option class="cursor-pointer" on:click={() => quarter.set(q)} value={q}>{q.season} {q.year}</option>
        {/if}
        
      {/each}
    </select>
  {:else}
    <a
      class="flex flex-col rounded-md hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 px-2"
      href="/"
    >
      <p class="text-2xl font-extrabold">BOSS</p>
      <p class="text-xs font-bold">SCHEDULER</p>
    </a>
    
  {/if}

	<!-- Center bit -->
	<div class="hidden md:flex flex-row space-x-6">
		<!-- if this section selected, hide the buttons and show the select for term -->
		{#if $page.route.id?.startsWith('/calendar')}
      <select class="cursor-pointer hover:bg-gray-800 rounded-lg dark:bg-gray-700 px-2 py-1" placeholder="Quarter">
        {#each quarters as q}
          {#if q.year === $quarter?.year && q.season === $quarter.season}
            <option class="cursor-pointer" selected={true} value={q}>{q.season} {q.year}</option>
          {:else}
            <option class="cursor-pointer" on:click={() => quarter.set(q)} value={q}>{q.season} {q.year}</option>
          {/if}
          
        {/each}
      </select>
    {:else}
			<a href="/calendar?new=true&year={$quarter?.year}&season={$quarter?.season}" class="dark:text-white hover:cursor-pointer font-poppins">NEW</a>
			{#if showRecentLink}
				<a href="/calendar?year={$quarter?.year}&season={$quarter?.season}" class="dark:text-white hover:cursor-pointer font-poppins">RECENT</a>
			{/if}
		{/if}
    <!-- <a href="/calendar?new=true&year={$quarter.year}&season={$quarter.season}" class="dark:text-white hover:cursor-pointer font-poppins">NEW</a> -->
    <!-- {#if showRecentLink} -->
    <!--   <a href="/calendar" class="dark:text-white hover:cursor-pointer font-poppins">RECENT</a> -->
    <!-- {/if} -->
	</div>

	<!-- RIGHT BIT -->
	<!-- temp empty circle where icon should be -->
	<div class="flex flex-row items-center space-x-2">
		<!-- <div class="hidden md:block space-x-2"> -->
		<!-- 	<a -->
		<!-- 		href="/catalogue" -->
		<!-- 		class="btn-round font-poppins py-0 bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:cursor-pointer bg-blue-400" -->
		<!-- 		>Catalogue</a -->
		<!-- 	> -->
		<!-- </div> -->
		<a href="/catalogue" class="dark:text-white hover:cursor-pointer font-poppins">CATALOGUE</a>
	</div>
</div>
