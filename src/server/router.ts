import { router, publicProcedure } from "./context";
import { z } from "zod";

export const serverRouter = router({
  findAll: publicProcedure.query(({ ctx }) => ctx.prisma.todo.findMany()),
  insertOne: publicProcedure.input(z.object({ title: z.string() })).mutation(
    async ({ input, ctx }) =>
      await ctx.prisma.todo.create({
        data: { title: input.title },
      })
  ),
  updateOne: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;
      await ctx.prisma.todo.update({
        where: { id },
        data: { ...rest },
      });
    }),
  deleteAll: publicProcedure
    .input(
      z.object({
        ids: z.number().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;
      await ctx.prisma.todo.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    }),
});

export type ServerRouter = typeof serverRouter;
