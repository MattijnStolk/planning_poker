import { GraphQLError } from "graphql";
import type { Player } from "../types/Player.js";
import type { Session } from "../types/Session.js";
import { sessions } from "./sessions.js";

export function requireTrimmedName(raw: string): string {
  const name = raw.trim();
  if (!name) {
    throw new GraphQLError("Name is required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  return name;
}

export function requireSession(sessionId: string): Session {
  const session = sessions[sessionId];
  if (!session) {
    throw new GraphQLError("Session not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return session;
}

export function requirePlayer(session: Session, playerId: string): Player {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) {
    throw new GraphQLError("Player not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return player;
}

export function requireHost(session: Session, playerId: string): void {
  if (session.hostId !== playerId) {
    throw new GraphQLError("Only the host can perform this action", {
      extensions: { code: "FORBIDDEN" },
    });
  }
}
