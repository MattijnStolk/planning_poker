export type Player = {
  id: string;
  name: string;
  vote?: string | null;
};

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

export type Session = {
  id: string;
  hostId: string;
  revealed: boolean;
  players: Player[];
  history: RoundHistory[];
};
