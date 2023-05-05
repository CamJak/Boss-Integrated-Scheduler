import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { appRouter } from "./routers/root";
import { createContext } from "./trpc";
import { Env, validateEnvironment } from "./env";

// validate environment configurations using Zod
export const env: Env = validateEnvironment();

// initialize Prisma database ORM client
export const prisma = new PrismaClient();

const app: Express = express();


// if in DEV mode, change CORS policy to avoid errors
if (env.RUN_MODE === "DEV") {
  app.use(cors());
} else if (env.RUN_MODE === "PROD") {
  app.use(cors({
    origin: "*"
  }));
}

// add tRPC routes to /trpc
app.use("/trpc", createExpressMiddleware({ router: appRouter }), createContext);

const port = env.PORT || 3000;

// listen for requests at this port
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

export type AppRouter = typeof appRouter;
