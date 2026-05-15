"use client";

import type { Player } from "@/types/session";
import { useI18n } from "@/providers/I18nProvider";

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
  const { t } = useI18n();
  return (
    <ul className="divide-y divide-[var(--color-border-muted)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
      {players.map((p) => (
        <li
          key={p.id}
          className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
        >
          <span className="font-medium text-[var(--color-text)]">
            {p.name}
            {p.id === currentPlayerId ? (
              <span className="ml-2 rounded bg-[var(--color-surface-elevated)] px-2 py-0.5 text-xs text-[var(--color-muted)] border border-[var(--color-border-muted)]">
                {t("session.youBadge")}
              </span>
            ) : null}
          </span>
          <span className="text-[var(--color-muted)]">
            {revealed ? (
              <span className="font-mono text-lg text-[var(--color-accent-warm)]">
                {p.vote ?? "—"}
              </span>
            ) : hasVoted(p) ? (
              <span className="text-[var(--color-chip-success-text)]">{t("session.voted")}</span>
            ) : (
              <span className="text-[var(--color-muted-deep)]">{t("session.waiting")}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
