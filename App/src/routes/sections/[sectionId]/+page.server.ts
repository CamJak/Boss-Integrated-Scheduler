import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// Example from my personal website where I fetched some data for a blogpost
	// const getBlogpost = async (id: string): Promise<BlogpostWithBody> => {
	//   const blogpostRes = await fetch(`${API_URL}/blogpost/${id}`);
	//   const blogpostData = await blogpostRes.json();
	//   blogpostData.tags = blogpostData["tags"].replace(", ", ",").split(",");
	//   blogpostData.dateUpdated = createDate(blogpostData.dateUpdated);
	//   blogpostData.dateCreated = createDate(blogpostData.dateCreated);
	//   // console.log(blogpostRes)
	//   return blogpostData;
	// }

	// Since this is only ran server side, you won't see this in browser console. You'll see it in your terminal
	console.log('See this message?');

	return {
		// blogpost: getBlogpost(params.id)
		sectionId: params.sectionId
	};
}) satisfies PageServerLoad;
