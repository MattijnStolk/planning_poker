import { gql } from "@apollo/client";

export const GET_SESSION = gql`
  query Session($id: ID!) {
    session(id: $id) {
      id
      hostId
      revealed
      players {
        id
        name
        vote
      }
      history {
        round
        createdAt
        votes {
          playerId
          playerName
          vote
        }
      }
    }
  }
`;
