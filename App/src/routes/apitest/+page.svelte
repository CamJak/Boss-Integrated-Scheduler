<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { subjects, message } = data;
</script>

<h1 class="dark:text-white">{message}</h1>

{#if data}
	{#each subjects as subject}
		<p class="dark:text-white text-sm">{subject.name}</p>
	{/each}
{/if}
