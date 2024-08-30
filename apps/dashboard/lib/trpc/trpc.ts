import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context";
import { getTenantId } from "../auth";

export const t = initTRPC.context<Context>().create({ transformer: superjson });

export const auth = t.middleware(({ next, ctx }) => {
  //TODO: Update to Lucia
  // if (!ctx.user?.id) {
  //   throw new TRPCError({ code: "UNAUTHORIZED" });
  // }
  const tentant = getTenantId();
  return next({
    ctx: {
      user: tentant,
      tenant: ctx.tenant ?? { id: tentant, role: "owner" },
    },
  });
});
