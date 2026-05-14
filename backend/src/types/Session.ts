import type { Player } from "./Player.js";

export type Session = {
  id: string;
  hostId: string;
  revealed: boolean;
  players: Player[];
};
