<script lang="ts">
	export let icon: string;
	// export let body: string;
</script>

<div
	class="rounded-3xl flex flex-row dark:bg-gray-900 bg-slate-300 px-6 py-4 items-center justify-between mx-10"
>
	<div class="dark:text-white">icon</div>
	<div class="md:w-[36em] lg:w-[52em] pl-4">
		<slot />
	</div>
</div>
