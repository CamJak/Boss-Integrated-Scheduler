<script lang="ts">
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
</script>

<div class="min-h-screen bg-white dark:bg-black">
	<Nav />

	<slot />
</div>
