import type { Player } from "../types/Player.js";
import type { RoundHistory } from "../types/RoundHistory.js";
import type { Session } from "../types/Session.js";
import { generateId, generatePlayerId } from "../utils/generateId.js";
import { sessions } from "../store/sessions.js";
import {
  requireHost,
  requirePlayer,
  requireSession,
  requireTrimmedName,
} from "../store/sessionGuards.js";

export function getSession(sessionId: string): Session | null {
  return sessions[sessionId] ?? null;
}

function playerHasVoted(player: Player): boolean {
  return player.vote !== undefined && player.vote !== "";
}

function allPlayersHaveVoted(session: Session): boolean {
  return session.players.length > 0 && session.players.every(playerHasVoted);
}

function appendRoundHistory(session: Session): void {
  const votesSnapshot = session.players.map((p) => ({
    playerId: p.id,
    playerName: p.name,
    vote: p.vote ?? "",
  }));
  const round: RoundHistory = {
    round: session.history.length + 1,
    createdAt: new Date().toISOString(),
    votes: votesSnapshot,
  };
  session.history.push(round);
}

function generateUniqueSessionId(): string {
  let id = generateId();
  while (sessions[id]) {
    id = generateId();
  }
  return id;
}

export function createSession(hostName: string): Session {
  const name = requireTrimmedName(hostName);
  const sessionId = generateUniqueSessionId();
  const hostId = generatePlayerId();
  const host: Player = { id: hostId, name };
  const session: Session = {
    id: sessionId,
    hostId,
    revealed: false,
    players: [host],
    history: [],
  };
  sessions[sessionId] = session;
  return session;
}

export function joinSession(sessionId: string, joinerName: string): Player {
  const session = requireSession(sessionId);
  const name = requireTrimmedName(joinerName);
  const player: Player = {
    id: generatePlayerId(),
    name,
  };
  session.players.push(player);
  return player;
}

export function vote(
  sessionId: string,
  playerId: string,
  value: string
): Session {
  const session = requireSession(sessionId);
  const player = requirePlayer(session, playerId);
  player.vote = value;
  if (allPlayersHaveVoted(session)) {
    if (!session.revealed) {
      session.revealed = true;
      appendRoundHistory(session);
    }
  }
  return session;
}

export function resetVotes(sessionId: string, playerId: string): Session {
  const session = requireSession(sessionId);
  requireHost(session, playerId);
  session.revealed = false;
  for (const p of session.players) {
    delete p.vote;
  }
  return session;
}
