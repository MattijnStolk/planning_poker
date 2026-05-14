import type { Player } from "@/types/session";

type PlayerListProps = {
  players: Player[];
  revealed: boolean;
  currentPlayerId?: string | null;
};

function hasVoted(player: Player): boolean {
  return !!(player.vote && player.vote.length > 0);
}

export function PlayerList({
  players,
  revealed,
  currentPlayerId,
}: PlayerListProps) {
  return (
    <ul className="divide-y divide-slate-800 rounded-lg border border-slate-700 bg-slate-900">
      {players.map((p) => (
        <li
          key={p.id}
          className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
        >
          <span className="font-medium text-slate-100">
            {p.name}
            {p.id === currentPlayerId ? (
              <span className="ml-2 rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                you
              </span>
            ) : null}
          </span>
          <span className="text-slate-400">
            {revealed ? (
              <span className="font-mono text-lg text-amber-300">
                {p.vote ?? "—"}
              </span>
            ) : hasVoted(p) ? (
              <span className="text-emerald-400">Voted</span>
            ) : (
              <span className="text-slate-500">Waiting</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
