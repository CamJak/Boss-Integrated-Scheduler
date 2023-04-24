import { prisma } from "..";
import { courseSchema } from "../models/courses";
import type { Course } from "../models/courses";
import { t } from "../trpc";
import { z } from "zod";

const getCoursesInputSchema = z.object({
  subjectId: z.string().uuid()
})

export const coursesRouter = t.router({
  getCourses: t.procedure.input(getCoursesInputSchema).output(z.array(courseSchema)).query(async ({ input }) => {
  const { subjectId } = input;
    // use this prisma query when actual data exists
    //return await prisma.subject.findMany();
    const subjects = await prisma.subject.findMany({
        where: {
            subjectId: subjectId
        },
        include: {
            courses: true
        }
    });
    const subject = subjects[0];
    return subject.courses;
  }),
  // get subject by Id
  // validate with Zod
})