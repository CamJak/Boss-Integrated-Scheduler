import { prisma } from "..";
import { sectionSchema } from "../models/sections";
import type { Section } from "../models/sections";
import { t } from "../trpc";
import { z } from "zod";

const getSectionsInputSchema = z.object({
  courseId: z.string().uuid()
})

const getSectionByCallNumberInputSchema = z.object({
  callNumber: z.number()
})

export const sectionsRouter = t.router({
  getSections: t.procedure.input(getSectionsInputSchema).output(z.array(sectionSchema)).query(async ({ input }) => {
  const { courseId } = input;
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    const courses = await prisma.course.findMany({
        where: {
            courseId: courseId
        },
        include: {
            sections: true
        }
    });
    const course = courses[0];
    return course.sections;
  }),
  getSectionByCallNumber: t.procedure.input(getSectionByCallNumberInputSchema).output(sectionSchema).query(async ({ input }) => {
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
