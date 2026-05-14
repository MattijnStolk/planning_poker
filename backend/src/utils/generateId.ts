import { randomBytes } from "node:crypto";

/** Short opaque ID suitable for URLs and in-memory keys */
export function generateId(): string {
  return randomBytes(12).toString("hex");
}
