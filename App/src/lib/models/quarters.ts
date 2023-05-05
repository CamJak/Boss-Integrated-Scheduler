import { z } from "zod";

export const quarterStoreTypeSchema = z.object({
  year: z.number(),
  season: z.enum(["Winter", "Spring", "Summer", "Fall"])
});

export type QuarterStoreType = z.TypeOf<typeof quarterStoreTypeSchema>;
