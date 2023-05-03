import { browser } from "$app/environment";
import { client } from "$lib/trpc";
import { writable } from "svelte/store";
import type { QuarterStoreType } from "$lib/models/quarters";
import schedule from "./schedule";

export type Season = "Spring" | "Summer" | "Fall" | "Winter";

// let firstRun = true;

let initialValue: QuarterStoreType;

let fetched = browser ? window.localStorage.getItem('quarter') ?? null : null;

if (fetched) {
  initialValue = { year: Number(fetched.split(" ")[1]), season: fetched.split(" ")[0] as Season };
} else {
  let apiResult = await client.quarters.getLatestQuarter.query();
  initialValue = { season: apiResult.season, year: apiResult.year };
}

const quarter = writable<QuarterStoreType>(initialValue);

quarter.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('quarter', `${value.season} ${value.year}`);
    // if (firstRun) {
    //   window.localStorage.setItem('quarter', `${value.season} ${value.year}`);
    // } else {
    //   if (value.year !== initialValue.year || value.season !== initialValue.season) {
    //     window.localStorage.setItem('quarter', `${value.season} ${value.year}`);
    //     schedule.set('[]');
    //   }
    // }
  }
})

export default quarter;

