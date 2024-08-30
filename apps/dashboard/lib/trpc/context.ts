import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { getTenantId } from "../auth";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const tenant = getTenantId();
  //TODO: CHECK FOR USER OR ORG FOR TENANTS
  return {
    req,
    audit: {
      userAgent: req.headers.get("user-agent") ?? undefined,
      location:
        req.headers.get("x-forwarded-for") ??
        process.env.VERCEL_REGION ??
        "unknown",
    },
    user: tenant,
    tenant: tenant,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
