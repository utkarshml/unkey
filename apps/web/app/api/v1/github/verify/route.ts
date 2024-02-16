import { createVerify } from "crypto";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { Clerk } from "@clerk/backend";
import { sha256 } from "@unkey/hash";
import { Resend } from "@unkey/resend";

const GITHUB_KEYS_URI = "https://api.github.com/meta/public_keys/secret_scanning";

const { CLERK_SECRET_KEY, RESEND_API_KEY } = env();

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });
const resend = new Resend({ apiKey: RESEND_API_KEY });

type Payload = {
  token: string;
  type: string;
  url: string;
  source: string;
}[];

type Key = {
  key_identifier: string;
  is_current: boolean;
  key: string;
};

function payloadToString(payloads: Payload): string {
  return `${payloads
    .map((payload) => {
      let str = "{";
      const keys = Object.keys(payload) as (keyof Payload)[];
      keys.forEach((key, index) => {
        // Ensure that keys and string values are enclosed in quotes
        str += `"${key}":"${payload[key]}"`;
        if (index < keys.length - 1) {
          str += ",";
        }
      });
      str += "}";
      return str;
    })
    .join(",")}`;
}

async function verifyKey(payload: Payload, identifier: string, signature: string) {
  const res = await fetch(GITHUB_KEYS_URI);
  const json = await res.json();
  const { key } = json.public_keys.find((key: Key) => key.key_identifier === identifier);
  const verifier = createVerify("SHA256").update(payloadToString(payload));
  const result = verifier.verify(
    key,
    Buffer.from(signature as string, "base64").toString(),
    "base64",
  );
  return result;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const headers = await request.headers;
    const signature = headers.get("github-public-key-signature");
    const identifier = headers.get("github-public-key-identifier");
    if (!signature || !identifier) {
      console.error("Invalid request: missing identifying headers from Github");
    }
    // const result = await verifyKey(payload, identifier as string, signature as string);
    const result = true;
    if (!result) {
      console.error("Signature does not match payload");
    } else {
      console.log(payload[0].token);
      const hash = await sha256(payload[0].token);
      //@ts-ignore
      const { ownerId } = await db.query.keys.findFirst({
        where: (keys, { eq }) => eq(keys.hash, hash),
      });
      // TODO: get team and email all users on team
      const user = await clerk.users.getUser(ownerId);
      //@ts-ignore
      const { emailAddress } = user.emailAddresses.find(
        ({ id }) => id === user.primaryEmailAddressId,
      );
      console.log(resend);
      await resend.sendKeyDeletionEmail({ email: emailAddress });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
}
