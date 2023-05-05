import { createTRPCProxyClient } from '@trpc/client';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/';
import { PUBLIC_API_URL } from "$env/static/public";


// TODO: API endpoint url needs to be updated for PROD
export const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			// url: 'http://localhost:3000/trpc'
			url: `${PUBLIC_API_URL}/trpc`
		})
	]
});
