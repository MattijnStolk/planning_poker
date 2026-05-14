import { GraphQLError } from "graphql";
import { sessions } from "../store/sessions.js";
import { generateId } from "../utils/generateId.js";
import type { Player } from "../types/Player.js";

function hasVoted(player: Player): boolean {
  return player.vote !== undefined && player.vote !== "";
}

export const resolvers = {
  Query: {
    session(_parent: unknown, args: { id: string }) {
      return sessions[args.id] ?? null;
    },
  },
  Mutation: {
    createSession(_parent: unknown, args: { name: string }) {
      const name = args.name.trim();
      if (!name) {
        throw new GraphQLError("Name is required", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const sessionId = generateId();
      const hostId = generateId();
      const host: Player = { id: hostId, name };
      const session = {
        id: sessionId,
        hostId,
        revealed: false,
        players: [host],
      };
      sessions[sessionId] = session;
      return session;
    },
    joinSession(_parent: unknown, args: { sessionId: string; name: string }) {
      const session = sessions[args.sessionId];
      if (!session) {
        throw new GraphQLError("Session not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const name = args.name.trim();
      if (!name) {
        throw new GraphQLError("Name is required", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const player: Player = {
        id: generateId(),
        name,
      };
      session.players.push(player);
      return player;
    },
    vote(
      _parent: unknown,
      args: { sessionId: string; playerId: string; value: string }
    ) {
      const session = sessions[args.sessionId];
      if (!session) {
        throw new GraphQLError("Session not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const player = session.players.find((p) => p.id === args.playerId);
      if (!player) {
        throw new GraphQLError("Player not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      player.vote = args.value;
      return session;
    },
    revealVotes(_parent: unknown, args: { sessionId: string }) {
      const session = sessions[args.sessionId];
      if (!session) {
        throw new GraphQLError("Session not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const allVoted = session.players.length > 0 && session.players.every(hasVoted);
      if (!allVoted) {
        throw new GraphQLError("Not all players have voted yet", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      session.revealed = true;
      return session;
    },
  },
};
