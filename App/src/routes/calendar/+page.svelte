<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import {
		createCalendarConfig,
		type Section,
		type Course,
		type Subject
	} from '$lib/models/Calendar';
	import { client } from '$lib/trpc';
	import { onMount } from 'svelte';
	import schedule from '$lib/stores/schedule';

	// load initial API data
	export let data;
	let { subjects } = data;
	// initialize array to store current courses
	let courses: Course[] = [];
	// initialize array to store current sections
	let sections: Section[] = [];

	onMount(() => {
		let loadedSchedule: any[] = JSON.parse($schedule);
		for (let i of loadedSchedule) {
			addSection(i);
		}
	});

	// function to query API for courses
	async function getCourses(s: Subject) {
		courses = await client.courses.getCourses.query({ subjectId: s.subjectId });
	}
	// function to query API for sections
	async function getSections(c: Course) {
		sections = await client.sections.getSections.query({ courseId: c.courseId });
	}
	// function to get section by call number via API
	async function getSectionByCallNumber(callNumber: number) {
		return await client.getSectionByCallNumber.getSection.query({ callNumber: callNumber });
	}

	// function used to get the monday of the current week
	// need this because the calendar is meant for full schedules and we want to convert it to just weekly (ignoring dates)
	function getMonday(d: Date) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	// get nearest monday and store to variable for later use
	let monday = getMonday(new Date());

	// initializing the calendar object and setting options
	let ec: Calendar;
	let plugins = [TimeGrid];
	let options = {
		view: 'timeGridWeek', // set view to week
		height: '700px',
		slotMinTime: '07:00:00', // 7am to ...
		slotMaxTime: '19:00:00', // 7pm
		firstDay: '1', // set first day of week to monday
		hiddenDays: [0, 6], // hide weekends
		allDaySlot: false, // hide all day slotS
		dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric' },
		headerToolbar: { start: '', center: '', end: '' }, // hide header
		theme: createCalendarConfig({
			// any theme configurations would go here
			today: '' // remove highlight for today (can be handled another way if we want to keep it)
		})
	};

	// TODO: Replace with actual data from API

	// variables to bind to select elements
	let selectedSubject: Subject;
	let selectedCourse: Course;
	// variables to store currently selected subject and course
	// needs to be unbound to keep key errors from occuring due to weird selections
	let currSubject: Subject = { subjectId: '', name: '', quarterId: 0 };
	let currCourse: Course = { courseId: '', name: '', subjectId: '' };

	// functions to handle subject and course selection events
	function selectSubject() {
		// sets selected subject
		currSubject = selectedSubject;
		// clears course selections
		currCourse = { courseId: '', name: '', subjectId: '' };
		selectedCourse = { courseId: '', name: '', subjectId: '' };
		// updates svelte elements
		currSubject = currSubject;
		currCourse = currCourse;
		// query API for courses
		getCourses(currSubject);
	}

	function selectCourse() {
		// sets selected course
		currCourse = selectedCourse;
		// updates svelte elements
		currCourse = currCourse;
		// query API for sections
		getSections(currCourse);
	}

	// initialize empty list for added sections
	let addedSections: Section[] = [];

	// list of possible section colors
	let colors = ['#2D41F0', '#F02D2D', '#F0A02D', '#D5C747', '#2EC62E'];

	let colorIndex = 0;

	function addEvent(
		days: string,
		timeStart: string,
		timeStop: string,
		title: string,
		store: boolean = false
	) {
		var eventDay: string;

		// iterate through days value of event and find a match
		// when match is found, create a new event on that day with given data
		for (let i = 0; i < days.length; i++) {
			const character = days.charAt(i);
			// need to verify that the class is not async online
			if (character == 'M') {
				eventDay = monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + monday.getDate();
			} else if (character == 'T') {
				eventDay =
					monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + (monday.getDate() + 1);
			} else if (character == 'W') {
				eventDay =
					monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + (monday.getDate() + 2);
			} else if (character == 'R') {
				eventDay =
					monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + (monday.getDate() + 3);
				// should logically be Friday (Further validation may be required, but this SHOULD work for now)
			} else {
				eventDay =
					monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + (monday.getDate() + 4);
			}
			let newEvent = {
				start: eventDay + ' ' + timeStart,
				end: eventDay + ' ' + timeStop,
				resourceId: 1,
				title: title,
				color: colors[colorIndex]
			};
			ec.addEvent(newEvent);
		}
	}

	// function to remove event from calendar component by title
	function rmvEvent(e: string) {
		// pull all events from calendar component (NEED TO TYPE LATER)
		let events: any[] = ec.getEvents();
		// if the title of the event matches the title of the event to be removed, remove it
		// titles are specific to individual sections, so this should be fine
		for (let i = 0; i < events.length; i++) {
			if (events[i].title == e) {
				ec.removeEventById(events[i].id);
			}
		}
	}

	// function to parse Section model and display it on the calendar appropriately!
	function addSection(s: Section) {
		// check if section is already added and if so, do not add it again
		if (addedSections.includes(s) == false) {
			// add the section to the calendar
			addEvent(s.days, s.timeStart, s.timeStop, s.sectionTitle);
			// add the section to the list of added sections
			addedSections.push(s);
			addedSections = addedSections;
			// if section is combined, add the combined days to the calendar as well
			if (s.isCombined) {
				addEvent(s.combinedDays, s.combinedTimeStart, s.combinedTimeStop, s.sectionTitle);
			}
			schedule.set(JSON.stringify(addedSections));
		}
		colorIndex = (colorIndex + 1) % colors.length;
	}

	function rmvSection(s: Section) {
		// remove the section from the calendar
		// remove the section from the list of added sections
		addedSections.splice(addedSections.indexOf(s), 1);
		addedSections = addedSections;
		rmvEvent(s.sectionTitle);
		schedule.set(JSON.stringify(addedSections));
		colorIndex = (colorIndex - 1) % colors.length;
	}

	// initialize clearing state to false
	let clearing = false;

	// function to clear all events from the calendar
	function clearCalendar() {
		options.events = [];
		addedSections = [];
		schedule.set('[]');
		colorIndex = 0;
	}

	// function to check if user wants to clear the calendar
	// switch back to false after user confirms or some time passes (1.5 sec)
	function confirmClear() {
		if (clearing) {
			clearCalendar();
			clearing = false;
		} else {
			clearing = true;
			setTimeout(() => {
				clearing = false;
			}, 1500);
		}
	}

	// initialize import string for binding with text box
	let importString: string;
	// function to export calendar to call numbers
	function exportCalendar() {
		let callNumbersArray: string[] = [];
		let callNumbersString = '';
		for (let i = 0; i < addedSections.length; i++) {
			callNumbersArray.push(<string>(<unknown>addedSections[i].callNumber));
		}
		// convert array to a single string with commas
		callNumbersString = callNumbersArray.join(',');
		// populate the text box with the call numbers
		importString = callNumbersString;
	}

	// function to import calendar from call numbers
	async function importCalendar() {
		// split import string into array of call numbers
		let callNumbersArray: string[] = importString.split(',');
		// iterate through call numbers and add them to the calendar
		for (let i = 0; i < callNumbersArray.length; i++) {
			// find the section with the call number
			let section: Section = await getSectionByCallNumber(Number(callNumbersArray[i]));
			// add the section to the calendar
			addSection(section);
		}
	}
</script>

<svelte:head>
	<title>BOSS Calendar</title>
	<meta name="description" content="Integrated calendar component" />
</svelte:head>

<div class="flex flex-col items-center">
	<div class="h-6">
	</div>
</div>

<div class="px-20 dark:text-white flex flex-row gap-6">
	<!-- Left side section for 'section' selection (BOSS integration happens here) -->
	<div class="border-2 border-slate-400 rounded-lg space-y-2 basis-1/6 flex flex-col">
		<!-- Subject selection -->
		<select
			bind:value={selectedSubject}
			on:change={() => selectSubject()}
			name="subject"
			id="subject"
			class="w-full text-black"
		>
			<option value="" />
			{#each subjects as subject}
				<option value={subject}>{subject.name}</option>
			{/each}
		</select>
		<!-- Course selection -->
		{#key currSubject}
			{#if currSubject.name != ''}
				<select
					bind:value={selectedCourse}
					on:change={() => selectCourse()}
					name="course"
					id="course"
					class="w-full text-black"
				>
					<option value="" />
					{#each courses as course}
						<option value={course}>{course.name}</option>
					{/each}
				</select>
			{/if}
		{/key}
		<!-- Section selection -->
		<div class="overflow-y-auto h-[675px]">
			{#key currCourse}
				{#if currCourse.name != '' && currSubject.name != ''}
					{#each sections as section}
						<div
							class="border-2 border-slate-400 rounded-lg p-2 bg-blue-400 group relative z-0 m-2 text-sm"
						>
							<h1>{section.sectionTitle}</h1>
							{#if section.modality.includes('Online')}
								<h2 class="">ONLINE</h2>
							{:else}
								<h2>{section.days} {section.timeStart}-{section.timeStop}</h2>
							{/if}
							<h2>{section.instructor}</h2>
							<h2>{section.callNumber}</h2>
							<button
								on:click={() => addSection(section)}
								class="invisible group-hover:visible bg-green-600 rounded-lg absolute z-10 top-0 right-0 p-1 text-black text-lg"
								>+</button
							>
						</div>
					{/each}
				{/if}
			{/key}
		</div>
	</div>

	<!-- Our nice calendar component -->
	<div class="basis-5/6">
		<Calendar bind:this={ec} {plugins} {options} />
		<!-- Buttons for exporting and importing calendar -->
		<button on:click={exportCalendar} class="rounded-full bg-blue-400 p-2">Export Calendar</button>
		<button on:click={importCalendar} class="rounded-full bg-blue-400 p-2">Import Calendar</button>
		<input type="text" bind:value={importString} class="text-black" placeholder="10001,10054,..." />
	</div>

	<!-- Right side section for showing 'sections' that are added to calendar -->
	<div class="border-2 border-slate-400 rounded-lg basis-1/6 flex flex-col">
		<!-- Display added sections in a scrollable bar -->
		<div class="overflow-y-auto h-[700px]">
			{#each addedSections as section}
				<div class="border-2 border-slate-400 rounded-lg p-2 bg-blue-400 group relative z-0 m-2">
					<h1>{section.sectionTitle}</h1>
					<h2>{section.callNumber}</h2>
					<button
						on:click={() => rmvSection(section)}
						class="invisible group-hover:visible bg-red-600 rounded-lg absolute z-10 top-0 right-0 p-2 text-black"
						>X</button
					>
				</div>
			{/each}
		</div>
		<!-- Cool little button for clearing calendar -->
		{#if clearing}
			<button on:click={confirmClear} class="rounded-full bg-red-600 p-2 w-full"
				>Are you sure?</button
			>
		{:else}
			<button on:click={confirmClear} class="rounded-full bg-blue-400 p-2 w-full"
				>Clear Calendar</button
			>
		{/if}
	</div>
</div>
