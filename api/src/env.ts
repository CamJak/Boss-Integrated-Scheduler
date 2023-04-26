import { z, ZodError } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string({ required_error: "You must provide a DATABASE_URL in your .env file!" }),
  RUN_MODE: z.enum(["DEV", "PROD"], { required_error: "You must provide a RUN_MODE in your .env file!" }),
  PORT: z.preprocess((x) => {
    if (typeof x === "string") return parseInt(x, 10);
    return x;
  }, z.number()).default(3000)
  // FRONTEND_URL: z.string({required_error: "You must provide a URL for the frontend in your .env file!"})
});

export type Env = z.TypeOf<typeof envSchema>;

export const validateEnvironment = (): Env => {
  try {
    let env = envSchema.parse(process.env);
    return env;
  } catch (err) {
    if (err instanceof ZodError) {
      for (let issue of err.issues) {
        console.error("ENV ERROR: ", issue.message);
      }
    }
    process.exit(1);
  }

}
