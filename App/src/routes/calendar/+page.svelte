<script lang="ts">
	import Calendar from "$lib/components/Calendar.svelte";
</script>

<div class="flex flex-col items-center">
    <h1 class="sm:text-7xl text-3xl dark:text-white font-extrabold text-center">Calendar Test Page!</h1>

    <div class="flex sm:flex-row flex-col items-center sm:space-x-2 space-y-2 sm:space-y-0">
		<a href="/" class="btn-round text-white bg-gradient-to-r from-blue-400 to-blue-600 font-poppins"
			>Go Back</a
		>
		<a
			href="/calendar"
			class="btn-round text-black bg-gradient-to-r from-slate-300 to-slate-400 font-poppins"
			>Nothing >:)</a
		>
	</div>
</div>

<Calendar />