import type { Player } from "./Player.js";
import type { RoundHistory } from "./RoundHistory.js";

export type Session = {
  id: string;
  hostId: string;
  revealed: boolean;
  players: Player[];
  history: RoundHistory[];
};
