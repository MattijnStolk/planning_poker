import type { Player } from "@/types/session";

type VoteResultsProps = {
  players: Player[];
};

export function VoteResults({ players }: VoteResultsProps) {
  const votes = players.map((p) => p.vote ?? "—").join(", ");
  return (
    <div className="rounded-lg border border-amber-900/60 bg-amber-950/30 px-4 py-3 text-sm text-amber-100">
      <p className="font-semibold text-amber-200">Results</p>
      <p className="mt-1 font-mono text-amber-100/90">{votes}</p>
    </div>
  );
}
