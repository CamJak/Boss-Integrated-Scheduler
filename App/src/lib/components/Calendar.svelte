<div class="flex flex-col items-center">
    <h1 class="dark:text-white">This is where my calendar would go... if I had one!</h1>
</div>

<div class="dark:bg-white bg-gray-600 w-[1000px] h-[600px] border-4 border-blue-600 rounded-md grid grid-cols-5 divide-x-2 divide-blue-600 divide-solid">
    <div class="grid grid-rows">
        <div class="text-center border-b-2 border-blue-600">Monday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-t-[1px] border-b-[1px] border-red-600 border-dashed"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-center border-b-2 border-blue-600">Tuesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-t-[1px] border-b-[1px] border-red-600 border-dashed"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-center border-b-2 border-blue-600">Wednesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-t-[1px] border-b-[1px] border-red-600 border-dashed"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-center border-b-2 border-blue-600">Thursday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-t-[1px] border-b-[1px] border-red-600 border-dashed"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-center border-b-2 border-blue-600">Friday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-t-[1px] border-b-[1px] border-red-600 border-dashed"></div>
        {/each}
    </div>
</div>