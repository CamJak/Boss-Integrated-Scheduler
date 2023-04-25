import { client } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		subjects: await client.subjects.getSubjects.query({ year: 2023, season: 'Spring' })
	};
};
