import { t } from "../trpc";
import { subjectsRouter } from "./subjects";
import { coursesRouter } from "./courses";
import { sectionsRouter } from "./sections";


export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hello world"
  }),
  logToServer: t.procedure.input(v => {
    if (typeof v === "string") return v;

    throw new Error("Invalid input: expected string");
  }).mutation(req => {
    console.log(`client says: ${req.input}`);
  }),
  subjects: subjectsRouter,
  courses: coursesRouter,
  sections: sectionsRouter
})
