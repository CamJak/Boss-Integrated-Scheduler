import { browser } from "$app/environment";
import { client } from "$lib/trpc";
import { writable } from "svelte/store";
import type { QuarterStoreType } from "$lib/models/quarters";
import schedule from "./schedule";

export type Season = "Spring" | "Summer" | "Fall" | "Winter";

let fetched = browser ? window.localStorage.getItem('quarter') ?? null : null;

const quarter = writable<string>();

if (fetched) {
  quarter.set(fetched);
}

quarter.subscribe((value) => {
  if (browser && value) {
    window.localStorage.setItem('quarter', value);
  }
})

export function makeQuarter(q: string): QuarterStoreType {
  return { year: Number(q.split(" ")[1]), season: q.split(" ")[0] as Season };
}

export default quarter;

