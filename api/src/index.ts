import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { appRouter } from "./routers/root";
import { createContext } from "./trpc";

export const prisma = new PrismaClient();

const app: Express = express();


// cors policy may need to be altered as we deploy and open our API to the public
// the second string here is for the production site's URL

// const frontendUrl: string = process.env.DEVMODE ? "localhost:5173" : "";

// app.use(cors({ origin: frontendUrl }));
if (process.env.DEVMODE) {
  app.use(cors());
}
app.use("/trpc", createExpressMiddleware({ router: appRouter }), createContext);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

export type AppRouter = typeof appRouter;
