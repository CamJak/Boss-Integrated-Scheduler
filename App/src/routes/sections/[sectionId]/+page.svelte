<script lang="ts">
	// syntax might look strange, but export let data tells the server component what to
	//  assign the return value of the load() function to.
	export let data;
	// we can extract this data as we please for simplicity
	const sectionId: number = data.sectionId;
</script>

<p>The id of this section is {sectionId}</p>
