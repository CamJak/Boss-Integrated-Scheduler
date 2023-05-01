import { prisma } from "..";
import { subjectSchema } from "../models/subjects";
import type { Subject } from "../models/subjects";
import { t } from "../trpc";
import { z } from "zod";
import { title } from "process";

const getSubjectsInputSchema = z.object({
  year: z.number(),
  season: z.enum(["Summer", "Fall", "Winter", "Spring"])
})

export const subjectsRouter = t.router({
  getSubjects: t.procedure.input(getSubjectsInputSchema).output(z.array(subjectSchema)).query(async ({ input }) => {
  const { year, season } = input;
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    const quarters = await prisma.quarter.findMany({
      where: {
        year: year,
        season: season
      },
      include: {
        Subject: {
          orderBy: {
            name: "asc"
          }
        }
      },
      orderBy: {
        dateUpdated: "desc"
      }
    });
    const quarter = quarters[0];
    return quarter.Subject;
  }),
  // get subject by Id
  // validate with Zod
})
