import * as sessionService from "../services/sessionService.js";

export const resolvers = {
  Query: {
    session(_: unknown, args: { id: string }) {
      return sessionService.getSession(args.id);
    },
  },
  Mutation: {
    createSession(_: unknown, args: { name: string }) {
      return sessionService.createSession(args.name);
    },
    joinSession(_: unknown, args: { sessionId: string; name: string }) {
      return sessionService.joinSession(args.sessionId, args.name);
    },
    vote(
      _: unknown,
      args: { sessionId: string; playerId: string; value: string }
    ) {
      return sessionService.vote(args.sessionId, args.playerId, args.value);
    },
    resetVotes(
      _: unknown,
      args: { sessionId: string; playerId: string }
    ) {
      return sessionService.resetVotes(args.sessionId, args.playerId);
    },
  },
};
