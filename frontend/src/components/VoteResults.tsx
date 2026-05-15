"use client";

import type { Player } from "@/types/session";
import { useI18n } from "@/providers/I18nProvider";

type VoteResultsProps = {
  players: Player[];
};

export function VoteResults({ players }: VoteResultsProps) {
  const { t } = useI18n();
  const votes = players.map((p) => p.vote ?? "—").join(", ");
  return (
    <div className="rounded-lg border border-[var(--color-accent-warm-border)] bg-[var(--color-accent-warm-bg)] px-4 py-3 text-sm text-[var(--color-accent-warm)]">
      <p className="font-semibold text-[var(--color-accent-warm)]">
        {t("session.resultsTitle")}
      </p>
      <p className="mt-1 font-mono opacity-95">{votes}</p>
    </div>
  );
}
