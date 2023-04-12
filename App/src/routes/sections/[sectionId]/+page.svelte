<script lang="ts">
	import type { PageServerData } from './$types';

	// syntax might look strange, but export let data tells the server component what to
	//  assign the return value of the load() function to.
	// PageServerData type is automatically generated based on the returns of your load function
	export let data: PageServerData;
	// we can extract this data as we please for simplicity
	//const sectionId: number = data.sectionId;

	// instead of above syntax, we can extract the data using the destructure syntax. This way
	//  type is inferred from the PageServerData type imported
	const { sectionId } = data;
</script>

<p>The id of this section is {sectionId}</p>
