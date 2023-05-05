import { prisma } from "..";
import { courseSchema } from "../models/courses";
import type { Section } from "../models/sections";
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
    const courses = await prisma.course.findMany({
        where: {
            subjectId: subjectId
        },
        include: {
          sections: true
        }
    });
    let i = 0;
    while (i < courses.length) {
      if (courses[i].sections.length == 0) {
        courses.splice(i, 1);
      } else {
        i++;
      };
    };
    return courses;
  }),
  // get subject by Id
  // validate with Zod
})