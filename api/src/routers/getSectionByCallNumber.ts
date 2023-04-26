import { prisma } from "..";
import { sectionSchema } from "../models/sections";
import type { Section } from "../models/sections";
import { t } from "../trpc";
import { z } from "zod";

const getSectionByCallNumberInputSchema = z.object({
  callNumber: z.number()
})

export const getSectionByCallNumberRouter = t.router({
  getSection: t.procedure.input(getSectionByCallNumberInputSchema).output(sectionSchema).query(async ({ input }) => {
  const { callNumber } = input;
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    const sections = await prisma.section.findMany({
        where: {
            callNumber: callNumber
        }
    });
    const section = sections[0];
    return section;
  }),
  // get subject by Id
  // validate with Zod
})