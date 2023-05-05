import { z } from "zod";
import { Quarter, quarterSchema, seasonValue } from "../models/quarters";
import { prisma } from "..";
import { t } from "../trpc";


export const quartersRouter = t.router({
  healthCheck: t.procedure.query(() => {
    console.log("hit qtr healthcheck");
    return "Hello from quarters!";
  }),
  asyncHealthCheck: t.procedure.query(async () => {
    console.log("hit async qtr healtcheck");
    await prisma.quarter.findMany();
    return "Hello from async quarters!";
  }),
  getQuarters: t.procedure.output(z.array(quarterSchema)).query(async () => {
    console.log("Getting Quarters");
    const quarters = await prisma.quarter.findMany({
      include: {
        Subject: false
      },
      orderBy: {
        dateUpdated: "desc"
      }
    });

    const quarterMap = new Map<string, Quarter>();

    for (let q of quarters) {
      const prevEntry = quarterMap.get(q.season + q.season);
      if (prevEntry) {
        if (prevEntry.dateUpdated.getTime() < q.dateUpdated.getTime()) {
          quarterMap.set(q.season + q.year, quarterSchema.parse(q));
        }
      } else {
        quarterMap.set(q.season + q.year, quarterSchema.parse(q));
      }
    }

    let resultQuarters: Quarter[] = [];
    for (let q of quarterMap.values()) {
      resultQuarters.push(q);
    }

    // resultQuarters.sort((a, b) => (a.year >))

    resultQuarters.sort((a, b) => (a.year < b.year) ? 1 : (a.year === b.year) ? ((seasonValue(a.season) < seasonValue(b.season)) ? 1 : -1) : -1);

    // resultQuarters.sort((a, b) => (seasonValue(a.season) > seasonValue(b.season)) ? 1 : -1);

    return resultQuarters;
  }),

  getLatestQuarter: t.procedure.query(async () => {
    console.log("gettingLatestQuarter");
    const quarters = await prisma.quarter.findMany({
      orderBy: {
        year: "desc"
      },
      include: {
        Subject: false
      }
    });

    let latestYear: number = 2023;

    for (let q of quarters) {
      if (q.year > latestYear) latestYear = q.year;
    }

    const filteredQuarters = z.array(quarterSchema).parse(quarters.filter(q => q.year === latestYear));

    let latestQuarter: Quarter = filteredQuarters[0];
    for (let q of filteredQuarters) {
      if (seasonValue(q.season) > seasonValue(latestQuarter.season)) latestQuarter = q;
    }

    return latestQuarter;
  })
});
