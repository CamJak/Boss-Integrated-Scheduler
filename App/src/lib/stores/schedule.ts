import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
const initialValue = browser ? window.localStorage.getItem('schedule') ?? '[]': '[]';
 
const schedule = writable<string>(initialValue);
 
schedule.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('schedule', value);
  }
});
 
export default schedule;
