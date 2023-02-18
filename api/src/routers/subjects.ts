import { prisma } from "..";
import { subjectSchema } from "../models/subjects";
import type { Subject } from "../models/subjects";
import { t } from "../trpc";
import { z } from "zod";

export const subjectsRouter = t.router({
  getSubjects: t.procedure.output(z.array(subjectSchema)).query(() => {
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    const subjects: Subject[] = [
      {
        subjectId: "e84e6c35-66da-43c2-824d-cbb42fa8911e",
        name: "Computer Science",
        quarterId: 1
      },
      {
        subjectId: "4e398065-13ff-435f-9fc5-0f1effc46ec4",
        name: "Mathematics",
        quarterId: 1
      },
      {
        subjectId: "098ad38e-9469-4d2d-ae5c-14be1516fd8d",
        name: "Economics",
        quarterId: 1
      },
      
    ];
    return subjects;
  }),
  // get subject by Id
  // validate with Zod
})
