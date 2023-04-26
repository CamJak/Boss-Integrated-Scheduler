<script lang="ts">
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="LA Tech B.O.S.S. scheduling simplified" />
</svelte:head>

<div class="inset-0 select-none">
	<div class="dark:bg-black w-full flex flex-col items-center">
		<p class="dark:text-white text-xl font-poppins">
			About us
		</p>
		<div class="flex flex-col space-y-4">
			<Card icon="test">
				<svelte:fragment>
					<div class="dark:text-white font-poppins">
						This project is created by Jack Branch and Cameron Thomas. We are both students at Louisiana Tech
						University majoring in Computer Science and Cyber Engineering respectively. 
					</div>
				</svelte:fragment>
			</Card>
			<Card icon="test">
				<svelte:fragment>
					<div class="dark:text-white font-poppins">
						<div class="flex flex-col">
							<h1 class="underline">Important links:</h1>
							<a href="https://github.com/CamJak/Boss-Integrated-Scheduler">- Our project github repo.</a>
							<a href="https://discord.gg/9Rek7e2G34">- Our project discord server, feedback is appreciated!.</a>
						</div>
					</div>
				</svelte:fragment>
			</Card>
		</div>
	</div>
</div>
