<div class="flex flex-col items-center">
    <h1 class="dark:text-white">This is where my calendar would go... if I had one!</h1>
</div>

<div class="w-[1200px] h-[600px] grid grid-cols-[4rem,6fr,6fr,6fr,6fr,6fr]">
    <div class="grid grid-rows">
        <div class="p-1 dark:bg-black bg-white"></div>
        {#each Array(12) as _, index (index)}
            {#if index == 0}
                <div class="text-center text-xs dark:bg-white bg-gray-600 rounded-tl-lg">{index}</div>
            {:else if index == 11}
                <div class="text-center text-xs dark:bg-white bg-gray-600 rounded-bl-lg">{index}</div>
            {:else}
                <div class="text-center text-xs dark:bg-white bg-gray-600">{index}</div>
            {/if}
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600 rounded-tl-lg">Monday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-4 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Tuesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Wednesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Thursday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600 rounded-tr-lg">Friday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-4 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
</div>

<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import type { Section } from '$lib/models/Calendar';

	// function used to get the monday of the current week
	// need this because the calendar is meant for full schedules and we want to convert it to just weekly (ignoring dates)
	function getMonday(d: Date) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	};

	// get nearest monday and store to variable for later use
	let monday = getMonday(new Date());

	// initializing the calendar object and setting options
	let ec: Calendar;
	let plugins = [TimeGrid];
    let options = {
        view: 'timeGridWeek',
		height: '700px',
		slotMinTime: '07:00:00',
		slotMaxTime: '19:00:00',
		firstDay: '1',
		hiddenDays: [0,6],
		allDaySlot: false,
		dayHeaderFormat: {weekday: 'long', month: 'numeric', day: 'numeric'},
		headerToolbar: {start: '', center: '', end: ''}
    };

	// Hardcoded sections for testing purposes :)
	let testSection1: Section = {
		title: "CSC -132 -001 THE SCIENCE OF COMPUTING III",
		callNumber: "20581",
		status: "closed",
		activity: "lecture",
		modality: "Face to face",
		days: "MWF",
		timeStart: "14:00",
		timeStop: "15:15",
		location: "IESB 205",
		instructor: "KIREMIRE A",
		creditHours: "3.00"
	};

	let testSection2: Section = {
		title: "CSC -132 -002 THE SCIENCE OF COMPUTING III",
		callNumber: "20581",
		status: "closed",
		activity: "lecture",
		modality: "Face to face",
		days: "TH",
		timeStart: "8:00",
		timeStop: "9:50",
		location: "IESB 205",
		instructor: "CHERRY K",
		creditHours: "3.00"
	};

	// function to parse Section model and display it on the calendar appropriately!
	// Need to add support for sections with multiple time values
	function addSection(s: Section) {
		var eventDay: string;
		// iterate through days value of section and find a match
		// when match is found, create a new event on that day with section data
		for (let i = 0; i < s.days.length; i++) {
			const character = s.days.charAt(i);
			if (character == 'M') {
				var eventDay = monday.getFullYear() + "-" + (monday.getMonth()+1) + "-" + monday.getDate();
			} else if (character == 'T') {
				var eventDay = monday.getFullYear() + "-" + (monday.getMonth()+1) + "-" + (monday.getDate()+1);
			} else if (character == 'W') {
				var eventDay = monday.getFullYear() + "-" + (monday.getMonth()+1) + "-" + (monday.getDate()+2);
			} else if (character == 'H') {
				var eventDay = monday.getFullYear() + "-" + (monday.getMonth()+1) + "-" + (monday.getDate()+3);
			} else if (character == 'F') {
				var eventDay = monday.getFullYear() + "-" + (monday.getMonth()+1) + "-" + (monday.getDate()+4);
			};
			let newEvent = {start: eventDay + " " + s.timeStart, end: eventDay + " " + s.timeStop, resourceId: 1, title: s.title, color: "#2D41F0"};
			ec.addEvent(newEvent);
		};
	};

	// function to clear all events from the calendar
	function clearCalendar() {
		options.events = []
	};
</script>

<div class="px-32 dark:text-white grid grid-cols-6 gap-6">
	<!-- Left side section for 'section' selection (BOSS integration happens here) -->
	<div class="border-2 border-slate-400 rounded-lg space-y-4 grid content-start">
		<select name="subject" id="subject" class="w-[200px]">
			<option value=""></option>
			<option value="Computer Science">Computer Science</option>
		</select>
		<select name="course" id="course" class="w-[200px]">
			<option value=""></option>
			<option value="CSC 132 - Something idk">CSC -132 THE SCIENCE OF COMPUTING III</option>
		</select>
		<button on:click={() => addSection(testSection1)} class="rounded-full bg-blue-400 p-2">Add Test Section 1</button>
		<button on:click={() => addSection(testSection2)} class="rounded-full bg-blue-400 p-2">Add Test Section 2</button>
		<button on:click={clearCalendar} class="rounded-full bg-blue-400 p-2">Clear Calendar</button>
	</div>

	<!-- Our nice calendar component -->
	<div class="col-start-2 col-end-6">
		<Calendar bind:this={ec} {plugins} {options} />
	</div>
	
	<!-- Right side section for showing 'sections' that are added to calendar -->
	<div class="border-2 border-slate-400 rounded-lg">List of active sections here!</div>
</div>