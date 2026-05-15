import { randomInt, randomUUID } from "node:crypto";

// Uppercase letters + digits, excluding easily confused 0/O, 1/I/L 
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const LENGTH = 6;

export function generateId(): string {
  let out = "";
  for (let i = 0; i < LENGTH; i++) {
    out += ALPHABET[randomInt(ALPHABET.length)];
  }
  return out;
}

export function generatePlayerId(): string {
  return randomUUID();
}
