import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const t = initTRPC.create();

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req, res
});
