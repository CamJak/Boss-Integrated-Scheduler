import type { QuarterStoreType } from '$lib/models/quarters';
import type { Season } from '$lib/stores/quarter';
import { client } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {

  const yearString = url.searchParams.get('year');
  let year = yearString ? Number(yearString) : null;
  const seasonString = url.searchParams.get('season');
  let season = seasonString ? seasonString as Season : null;

  if (!year || !season) {
    let latest = await client.quarters.getLatestQuarter.query();
    year = latest.year;
    season = latest.season;
  }

  const initialQuarter: string = `${season} ${year}`;

	return {
		subjects: await client.subjects.getSubjects.query({ year, season }),
    initialQuarter
	};
};
