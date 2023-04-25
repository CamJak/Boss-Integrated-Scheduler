const defaultConfig = {
	active: 'ec-active',
	allDay: 'ec-all-day',
	bgEvent: 'ec-bg-event',
	bgEvents: 'ec-bg-events',
	body: 'ec-body',
	button: 'ec-button',
	buttonGroup: 'ec-button-group',
	calendar: 'ec',
	compact: 'ec-compact',
	content: 'ec-content',
	day: 'ec-day',
	dayFoot: 'ec-day-foot',
	dayHead: 'ec-day-head',
	daySide: 'ec-day-side',
	days: 'ec-days',
	draggable: 'ec-draggable',
	dragging: 'ec-dragging',
	event: 'ec-event',
	eventBody: 'ec-event-body',
	eventTag: 'ec-event-tag',
	eventTime: 'ec-event-time',
	eventTitle: 'ec-event-title',
	events: 'ec-events',
	extra: 'ec-extra',
	ghost: 'ec-ghost',
	handle: 'ec-handle',
	header: 'ec-header',
	hiddenScroll: 'ec-hidden-scroll',
	hiddenTimes: 'ec-hidden-times',
	highlight: 'ec-highlight',
	icon: 'ec-icon',
	line: 'ec-line',
	lines: 'ec-lines',
	list: 'ec-list',
	month: 'ec-month',
	noEvents: 'ec-no-events',
	nowIndicator: 'ec-now-indicator',
	otherMonth: 'ec-other-month',
	pointer: 'ec-pointer',
	popup: 'ec-popup',
	preview: 'ec-preview',
	resizer: 'ec-resizer',
	resizingX: 'ec-resizing-x',
	resizingY: 'ec-resizing-y',
	resource: 'ec-resource',
	resourceTitle: 'ec-resource-title',
	selecting: 'ec-selecting',
	sidebar: 'ec-sidebar',
	sidebarTitle: 'ec-sidebar-title',
	time: 'ec-time',
	title: 'ec-title',
	today: 'ec-today',
	toolbar: 'ec-toolbar',
	uniform: 'ec-uniform',
	week: 'ec-week',
	withScroll: 'ec-with-scroll'
};

export interface Subject {
	subjectId: string;
	name: string;
	quarterId: number;
}

export interface Course {
	courseId: string;
	name: string;
	subjectId: string;
}

export interface Section {
	sectionId: string;
	courseId: string;
	callNumber: number;
	sectionTitle: string;
	creditHours: number;
	activity: string;
	modality: string;
	days: string; //put days as one concatenated string such as MWF or TH
	timeStart: string; //put times in 24 hour time with format 09:00 etc.
	timeStop: string;
	location: string;
	instructor: string;
	status: string;
	isCombined: boolean; //if true, then the section is a combined section
	combinedDays: string; //add data for combined section
	combinedTimeStart: string;
	combinedTimeStop: string;
	combinedLocation: string;
	note: string;
}

export function createCalendarConfig(configurations: object): object {
	let defaultC = JSON.parse(JSON.stringify(defaultConfig));
	for (let [key, value] of Object.entries(configurations)) {
		defaultC[key] = value;
	}
	return defaultC;
}
