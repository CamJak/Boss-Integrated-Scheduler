import { z } from "zod";

export const sectionSchema = z.object({
  sectionId: z.string().uuid(),
  courseId: z.string(),
  callNumber: z.number(),
  sectionTitle: z.string(),
  creditHours: z.number(),
  activity: z.string(),
  modality: z.string(),
  days: z.string(),
  timeStart: z.string(),
  timeStop: z.string(),
  location: z.string(),
  instructor: z.string(),
  status: z.string(),
  isCombined: z.boolean(),
  combinedDays: z.string(),
  combinedTimeStart: z.string(),
  combinedTimeStop: z.string(),
  combinedLocation: z.string(),
  note: z.string()
});
// generates a typescript type based on the above schema validator
export type Section = z.TypeOf<typeof sectionSchema>;