import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const isBrowser = typeof window !== "undefined";

const adjectives = [
  "friendly",
  "vibrant",
  "happy",
  "clever",
  "brave",
  // ... more adjectives
];

const animals = [
  "lion",
  "eagle",
  "tiger",
  "elephant",
  "panda",
  // ... more animals
];

export async function generateRandomSubdomain(db: Database): Promise<string> {
  let subdomain = "";
  // Keep generating until we get a unique subdomain
  while (!subdomain || await db.exists(schema.gateways, { name: subdomain })) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    subdomain = `${adjective}-${animal}`;
  }

  return subdomain;
}
