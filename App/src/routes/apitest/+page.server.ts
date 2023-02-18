import { client } from "$lib/trpc";
import type { PageServerLoad } from "../sections/[sectionId]/$types";

export const load: PageServerLoad = async () => {

  client.logToServer.mutate("Loading API test");
  return {
    message: await client.sayHi.query(),
    subjects: await client.subjects.getSubjects.query()
  } as const;
};
