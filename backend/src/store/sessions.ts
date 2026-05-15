import type { Session } from "../types/Session.js";

// In-memory store for sessions
export const sessions: Record<string, Session> = {};
