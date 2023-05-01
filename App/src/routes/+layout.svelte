<script lang="ts">
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
	import quarter from '$lib/stores/quarter';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const { quarters } = data;
</script>

<div class="min-h-screen bg-white dark:bg-black">
	<Nav {quarters} />

	<slot />
</div>
