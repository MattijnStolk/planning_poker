export type RoundHistoryVote = {
  playerId: string;
  playerName: string;
  vote: string;
};

export type RoundHistory = {
  round: number;
  createdAt: string;
  votes: RoundHistoryVote[];
};
