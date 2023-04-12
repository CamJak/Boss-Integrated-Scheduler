import { createTRPCProxyClient } from '@trpc/client';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/';

// TODO: API endpoint url needs to be updated for PROD
export const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc'
		})
	]
});
