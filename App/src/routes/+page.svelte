<article class="prose max-w-none px-4">
	<h1>Welcome to the BOSS-Integrated-Scheduler</h1>
	<!-- px-10 pads 10 pixels on left and right side of div -->
	<!-- I suggest taking a look at the Tailwindcss documentation. It's super useful
       and has a handy search feature -->
	<div class="px-10">
		<p>
			This site is empty. Like some other newer javascript frameworks, SvelteKit uses filesystem
			based routing. If you look in the file structure, there is a +page.svelte file for every
			route. The actual route in the url path is decided by the name of the folder
		</p>

		<p>
			Paths with parameters are created and named with brackets. I've created two dummy components
			to be removed, but showcase how this works.
		</p>

		<a class="underline" href="/sections">See Sections</a>

		<p>
			We we use .server to indicate that a bit of code should be ran on the server. This is done to
			speed up the experience of using the site through server-side datafetching. The parameterized
			route demonstrates this
		</p>

		<p class="text-emerald-500 text-xl">
			This article class "prose" is an example of a tailwind utility class. It does sane default
			formatting for an article style template. The formatting of this text is an example of text
			formatting though Tailwindcss
		</p>
	</div>
</article>
