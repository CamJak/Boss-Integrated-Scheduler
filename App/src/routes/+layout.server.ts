import { client } from "$lib/trpc";
import type { LayoutServerLoad } from "./$types";
import { z } from "zod";
import { quarterStoreTypeSchema } from "$lib/models/quarters";

export const load = (async () => {

  return {
    quarters: z.array(quarterStoreTypeSchema).parse(await client.quarters.getQuarters.query()),
    latestQuarter: await client.quarters.getLatestQuarter.query()
  };
}) satisfies LayoutServerLoad;
