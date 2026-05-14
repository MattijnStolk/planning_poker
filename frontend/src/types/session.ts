export type Player = {
  id: string;
  name: string;
  vote?: string | null;
};

export type Session = {
  id: string;
  hostId: string;
  revealed: boolean;
  players: Player[];
};
