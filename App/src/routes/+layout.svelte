<script lang="ts">
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
	import quarter from '$lib/stores/quarter';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const { quarters, latestQuarter } = data;

  // initialize the value for the quarterStore
  if ($quarter == null) {
    quarter.set(latestQuarter);
    console.log($quarter);
  }
</script>

<div class="min-h-screen bg-white dark:bg-gray-800">
	<Nav {quarters} />

	<slot />
</div>
