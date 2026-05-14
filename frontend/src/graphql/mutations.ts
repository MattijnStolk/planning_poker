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

export const REVEAL_VOTES = gql`
  mutation RevealVotes($sessionId: ID!) {
    revealVotes(sessionId: $sessionId) {
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
