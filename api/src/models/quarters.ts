import { z } from "zod";

export const quarterSchema = z.object({
  id: z.number(),
  year: z.number(),
  season: z.enum(["Spring", "Summer", "Fall", "Winter"]),
  dateUpdated: z.date()
});

export type Quarter = z.TypeOf<typeof quarterSchema>;

export const seasonValue = (season: "Spring" | "Summer" | "Fall" | "Winter"): number => {
  switch (season) {
    case "Winter": return 0
    case "Spring": return 1
    case "Summer": return 2
    case "Fall": return 3
  }
}

