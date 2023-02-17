import type { ServerRouter } from "@/server/router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

export const trpc = createTRPCNext<ServerRouter>({
  config({ ctx }) {
    return {
      links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
    };
  },
  ssr: true,
});
