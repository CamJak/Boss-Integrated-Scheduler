import { z } from "zod";

export const courseSchema = z.object({
  courseId: z.string().uuid(),
  name: z.string(),
  subjectId: z.string()
});
// generates a typescript type based on the above schema validator
export type Course = z.TypeOf<typeof courseSchema>;