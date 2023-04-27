<div class="sm:hidden dark:text-white">
	This is the navbar for mobile. It should have a drawer/dropdown type icon
</div>
<div class="hidden dark:text-white sm:flex flex-row px-2 items-center justify-between">
	<!-- Mobile -->
	<!-- LEFT BIT -->
	<a
		class="flex flex-col rounded-md hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 px-2"
		href="/"
	>
		<p class="text-2xl font-extrabold">BOSS</p>
		<p class="text-xs font-bold">SCHEDULER</p>
	</a>

	<!-- Center bit -->
	<div class="hidden md:flex flex-row space-x-6">
		<a href="/calendar?new" class="dark:text-white hover:cursor-pointer font-poppins">NEW</a>
		<a href="/calendar" class="dark:text-white hover:cursor-pointer font-poppins">RECENT</a>
	</div>

	<!-- RIGHT BIT -->
	<!-- temp empty circle where icon should be -->
	<div class="flex flex-row items-center space-x-2">
		<div class="hidden md:block space-x-2">
			<a
				href="/catalogue"
				class="btn-round font-poppins py-0 bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:cursor-pointer bg-blue-400"
				>Catalogue</a
			>
		</div>
	</div>
</div>
