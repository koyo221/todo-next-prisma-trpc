import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const prisma = new PrismaClient();
  return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
