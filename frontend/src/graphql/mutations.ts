import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(name: $name) {
      id
      hostId
      revealed
      players {
        id
        name
        vote
      }
    }
  }
`;

export const JOIN_SESSION = gql`
  mutation JoinSession($sessionId: ID!, $name: String!) {
    joinSession(sessionId: $sessionId, name: $name) {
      id
      name
      vote
    }
  }
`;

export const VOTE = gql`
  mutation Vote($sessionId: ID!, $playerId: ID!, $value: String!) {
    vote(sessionId: $sessionId, playerId: $playerId, value: $value) {
      id
      hostId
      revealed
      players {
        id
        name
        vote
      }
    }
  }
`;

export const RESET_VOTES = gql`
  mutation ResetVotes($sessionId: ID!, $playerId: ID!) {
    resetVotes(sessionId: $sessionId, playerId: $playerId) {
      id
      hostId
      revealed
      players {
        id
        name
        vote
      }
    }
  }
`;
