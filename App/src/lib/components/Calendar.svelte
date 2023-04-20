<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import { createCalendarConfig, type Section } from '$lib/models/Calendar';

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

	// Hardcoded sections for testing purposes :)
	let testSection1: Section = {
		title: 'CSC -132 -001 THE SCIENCE OF COMPUTING III',
		callNumber: '20581',
		status: 'closed',
		activity: 'lecture',
		modality: 'Face to face',
		days: 'MWF',
		timeStart: '14:00',
		timeStop: '15:15',
		location: 'IESB 205',
		instructor: 'KIREMIRE A',
		creditHours: '3.00',
		isCombined: false,
		combinedDays: '',
		combinedTimeStart: '',
		combinedTimeStop: '',
		combinedLocation: ''
	};

	let testSection2: Section = {
		title: 'CSC -132 -002 THE SCIENCE OF COMPUTING III',
		callNumber: '20581',
		status: 'closed',
		activity: 'lecture',
		modality: 'Face to face',
		days: 'TR',
		timeStart: '08:00',
		timeStop: '09:50',
		location: 'IESB 205',
		instructor: 'CHERRY K',
		creditHours: '3.00',
		isCombined: false,
		combinedDays: '',
		combinedTimeStart: '',
		combinedTimeStop: '',
		combinedLocation: ''
	};

	let testSection3: Section = {
		title: 'ELEN-423 -001 EMBEDDED SYSTEMS',
		callNumber: '30775',
		status: 'Closed',
		activity: 'Combined lecture and lab',
		modality: 'Face to face',
		days: 'TR',
		timeStart: '12:00',
		timeStop: '13:15',
		location: 'IESB 224',
		instructor: 'GATES M',
		creditHours: ' 3.00',
		isCombined: true,
		combinedDays: 'T',
		combinedTimeStart: '14:00',
		combinedTimeStop: '18:00',
		combinedLocation: 'UNVH 134'
	};

	// initialize empty list for added sections
	let addedSections: Section[] = [];

	function addEvent(days: string, timeStart: string, timeStop: string, title: string) {
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
				color: '#2D41F0'
			};
			ec.addEvent(newEvent);
		}
	}

	function rmvEvent(e: string) {
		// remove event from calendar
		let events: Event[] = ec.getEvents();
		for (let i = 0; i < events.length; i++) {
			if (events[i].title == e) {
				ec.removeEventById(events[i].id);
			}
		}
	}

	// function to parse Section model and display it on the calendar appropriately!
	function addSection(s: Section) {
		// add the section to the calendar
		addEvent(s.days, s.timeStart, s.timeStop, s.title);
		// add the section to the list of added sections
		addedSections.push(s);
		addedSections = addedSections;
		// if section is combined, add the combined days to the calendar as well
		if (s.isCombined) {
			addEvent(s.combinedDays, s.combinedTimeStart, s.combinedTimeStop, s.title);
		}
	}

	function rmvSection(s: Section) {
		// remove the section from the calendar
		// remove the section from the list of added sections
		addedSections.splice(addedSections.indexOf(s), 1);
		addedSections = addedSections;
		rmvEvent(s.title);
	}

	// initialize clearing state to false
	let clearing: boolean = false;

	// function to clear all events from the calendar
	function clearCalendar() {
		options.events = [];
		addedSections = [];
	}

	// function to check if user wants to clear the calendar
	// switch back to false after user confirms or some time passes (3 sec)
	function confirmClear() {
		if (clearing) {
			clearCalendar();
			clearing = false;
		} else {
			clearing = true;
			setTimeout(() => {
				clearing = false;
			}, 3000);
		}
	}

</script>

<div class="px-32 dark:text-white flex flex-row gap-6">
	<!-- Left side section for 'section' selection (BOSS integration happens here) -->
	<div class="border-2 border-slate-400 rounded-lg space-y-2 basis-1/6 flex flex-col">
		<select name="subject" id="subject" class="w-full text-black">
			<option value="" />
			<option value="Computer Science">Computer Science</option>
		</select>
		<select name="course" id="course" class="w-full text-black">
			<option value="" />
			<option value="CSC 132 - Something idk">CSC -132 THE SCIENCE OF COMPUTING III</option>
		</select>
		<button on:click={() => addSection(testSection1)} class="rounded-full bg-blue-400 p-2">Add Test Section 1</button>
		<button on:click={() => addSection(testSection2)} class="rounded-full bg-blue-400 p-2">Add Test Section 2</button>
		<button on:click={() => addSection(testSection3)} class="rounded-full bg-blue-400 p-2">Add Test Section 3</button>
	</div>

	<!-- Our nice calendar component -->
	<div class="basis-5/6">
		<Calendar bind:this={ec} {plugins} {options} />
	</div>

	<!-- Right side section for showing 'sections' that are added to calendar -->
	<div class="border-2 border-slate-400 rounded-lg basis-1/6 flex flex-col">
		<!-- Display added sections in a scrollable bar -->
		<div class="overflow-y-auto h-[700px]">
			{#each addedSections as section}
				<div class="border-2 border-slate-400 rounded-lg p-2 bg-blue-400 group relative z-0">
					<h1>{section.title}</h1>
					<h2>{section.callNumber}</h2>
					<button on:click={() => rmvSection(section)} class="invisible group-hover:visible bg-red-600 rounded-lg absolute z-10 top-0 right-0 p-2 text-black">X</button>
				</div>
			{/each}
		</div>
		<!-- Cool little button for clearing calendar -->
		{#if clearing}
		<button on:click={confirmClear} class="rounded-full bg-red-600 p-2 w-full">Are you sure?</button>
		{:else}
		<button on:click={confirmClear} class="rounded-full bg-blue-400 p-2 w-full">Clear Calendar</button>
		{/if}
	</div>
</div>
