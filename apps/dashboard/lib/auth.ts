import { redirect } from "next/navigation";

/**
 * Return the tenant id or a 404 not found page.
 *
 * The auth check should already be done at a higher level, and we're just returning 404 to make typescript happy.
 */
export function getTenantId(): string {
  // TODO: Add Lucia Check
  const userId = "user_2SORPfL5Q6STmGwrhaY9AuqcHIB";
  const orgId = "org_2j9I4mEcGo1CkEbhizGcOsa1ITW";
  return orgId ?? userId ?? redirect("/auth/sign-in");
}
