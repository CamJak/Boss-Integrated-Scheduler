<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AngledDarkImg from '$lib/images/BOSS_ART_ANGLED_DARK_TRANSPARENT.webp';
	import AngledLightImg from '$lib/images/BOSS_ART_ANGLED_LIGHT_TRANSPARENT.webp';
</script>

<svelte:head>
	<title>Scheduler</title>
	<meta name="description" content="LA Tech B.O.S.S. scheduling simplified" />
</svelte:head>

<div class="inset-0 select-none">
	<div class="dark:bg-black w-full flex flex-col items-center">
		<div class="flex flex-col lg:flex-row items-center px-4">
			<Hero />
			<img class="hidden dark:block pt-4 pb-2 px-10 w-[40em]" alt="CalendarConcept" src={AngledDarkImg} />
			<img class="dark:hidden pt-4 pb-2 px-10 w-[40em]" alt="CalendarConcept" src={AngledLightImg} />
		</div>
		<p class="dark:text-white text-xl font-poppins">
			Our Mission <span class="text-gray-200 dark:text-gray-700">draft</span>
		</p>
		<div class="flex flex-col space-y-4">
			<Card icon="test">
				<svelte:fragment>
					<div class="dark:text-white font-poppins">
						The mission of this project is to simplify the experience of people trying to make
						schedules with BOSS. The BOSS scheduling process is quite complicated and requires a lot
						of unnecessary effort in an already stressful occasion. This project could improve the
						experience as a student.
					</div>
				</svelte:fragment>
			</Card>
			<Card icon="test">
				<svelte:fragment>
					<div class="dark:text-white font-poppins">
						Illustrate what students can produce when given a chance to improve Tech's online
						infrastructure. Tech has a large amount of underutilized potential in the Computer
						Science and Cyber Engineering Departments. This project could create opportunity.
					</div>
				</svelte:fragment>
			</Card>
		</div>
	</div>
</div>
