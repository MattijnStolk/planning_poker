export const typeDefs = `#graphql
  type Player {
    id: ID!
    name: String!
    vote: String
  }

  type Session {
    id: ID!
    hostId: String!
    revealed: Boolean!
    players: [Player!]!
  }

  type Query {
    session(id: ID!): Session
  }

  type Mutation {
    createSession(name: String!): Session!
    joinSession(sessionId: ID!, name: String!): Player!
    vote(sessionId: ID!, playerId: ID!, value: String!): Session!
    resetVotes(sessionId: ID!, playerId: ID!): Session!
  }
`;
