import { t } from "../trpc";
import { subjectsRouter } from "./subjects";
import { coursesRouter } from "./courses";
import { sectionsRouter } from "./sections";
import { quartersRouter } from "./quarters";


export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hello world";
  }),
  healthCheck: t.procedure.query(() => {
    return "Hello from tRPC!";
  }),
  logToServer: t.procedure.input(v => {
    if (typeof v === "string") return v;

    throw new Error("Invalid input: expected string");
  }).mutation(req => {
    console.log(`client says: ${req.input}`);
  }),
  subjects: subjectsRouter,
  courses: coursesRouter,
  sections: sectionsRouter,
  quarters: quartersRouter,
})
