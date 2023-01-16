<div class="flex flex-col items-center">
    <h1 class="dark:text-white">This is where my calendar would go... if I had one!</h1>
</div>

<div class="w-[1200px] h-[600px] grid grid-cols-[4rem,6fr,6fr,6fr,6fr,6fr]">
    <div class="grid grid-rows">
        <div class="p-1 dark:bg-black bg-white"></div>
        {#each Array(12) as _, index (index)}
            {#if index == 0}
                <div class="text-center text-xs dark:bg-white bg-gray-600 rounded-tl-lg">{index}</div>
            {:else if index == 11}
                <div class="text-center text-xs dark:bg-white bg-gray-600 rounded-bl-lg">{index}</div>
            {:else}
                <div class="text-center text-xs dark:bg-white bg-gray-600">{index}</div>
            {/if}
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600 rounded-tl-lg">Monday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-4 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Tuesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Wednesday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600">Thursday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-2 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
    <div class="grid grid-rows">
        <div class="text-white bg-blue-600 sm:text-xl text-center font-poppins border-b-2 border-blue-600 rounded-tr-lg">Friday</div>
        {#each Array(48) as _, index (index)}
            <div class="text-center border-l-2 border-l-blue-600 border-r-4 border-r-blue-600 border-t-[1px] border-b-[1px] border-red-600 border-dashed dark:bg-white bg-gray-600 hover:bg-slate-300"></div>
        {/each}
    </div>
</div>