import { createVerify } from "crypto";

import { NextResponse } from "next/server";

const GITHUB_KEYS_URI = "https://api.github.com/meta/public_keys/secret_scanning";

type Payload = {
  token: string;
  type: string;
  url: string;
  source: string;
};

async function verifySignature(payload: Payload, signature: string, keyID: string): Promise<void> {
  if (!payload) {
    throw new Error("Invalid payload");
  }
  if (!signature) {
    throw new Error("Invalid signature");
  }
  if (!keyID) {
    throw new Error("Invalid keyID");
  }

  const response = await fetch(GITHUB_KEYS_URI);
  const data = await response.json();
  const keys = data.public_keys;

  if (!Array.isArray(keys) || keys.length === 0) {
    throw new Error("No public keys found");
  }

  const publicKey =
    keys.find((k: { key_identifier: string }) => k.key_identifier === keyID) ?? null;
  if (!publicKey) {
    throw new Error("No public key found matching key identifier");
  }

  const verifier = createVerify("SHA256").update(payload);
  if (!verifier.verify(publicKey.key, Buffer.from(signature, "base64"))) {
    throw new Error("Signature does not match payload");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headers = await request.headers;
    const signature = headers.get("github-public-key-signature");
    const identifier = headers.get("github-public-key-identifier");
    if (!signature || !identifier) {
      console.error("Invalid request: missing identifying headers from Github");
    }
    await verifySignature(body[0].payload, signature as string, identifier as string);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
  }
}
