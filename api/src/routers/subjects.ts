import { prisma } from "..";
import { t } from "../trpc";

export const subjectsRouter = t.router({
  getSubjects: t.procedure.query(() => {
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    return [
      {
        name: "Mathematics",
        id: 5
      },
      {
        name: "Computer Science",
        id: 6
      },
      {
        name: "Economics",
        id: 7
      },
    ]
  }),
  // get subject by Id
  // validate with Zod
})
