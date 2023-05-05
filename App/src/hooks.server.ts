import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	// rate limit check in the future

	return await resolve(event);
}) satisfies Handle;
