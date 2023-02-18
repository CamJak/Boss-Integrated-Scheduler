import { z } from "zod";

export const subjectSchema = z.object({
  subjectId: z.string().uuid(),
  name: z.string(),
  quarterId: z.number(),
});
// generates a typescript type based on the above schema validator
export type Subject = z.TypeOf<typeof subjectSchema>;
