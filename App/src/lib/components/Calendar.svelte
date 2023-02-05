<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import type { Section } from '$lib/models/Calendar';

	function getMonday(d: Date) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	};

	let monday = getMonday(new Date());

	let ec;
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
	function addSection(s: Section) {
		var eventDay: string;
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

	function clearCalendar() {
		options.events = []
	};
</script>

<div class="px-32 dark:text-white grid grid-cols-6 gap-6">
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

	<div class="col-start-2 col-end-6">
		<Calendar bind:this={ec} {plugins} {options} />
	</div>
	
	<div class="border-2 border-slate-400 rounded-lg">List of active sections here!</div>
</div>