import { client } from '$lib/trpc';
import type { PageServerLoad } from './$types';
import type { Subject } from '../../../../api/src/models/subjects';

export const load: PageServerLoad = async () => {
	client.logToServer.mutate('Loading API test');
	return {
		message: await client.sayHi.query(),
		subjects: await client.subjects.getSubjects.query()
	} as const;
};
