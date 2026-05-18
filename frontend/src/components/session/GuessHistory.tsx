"use client";

import type { RoundHistory } from "@/types/session";
import { useI18n } from "@/providers/I18nProvider";

type GuessHistoryProps = {
  entries: RoundHistory[];
};

export function GuessHistory({ entries }: GuessHistoryProps) {
  const { t } = useI18n();
  const newestFirst = [...entries].reverse();

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--color-text)]">
        {t("session.historyTitle")}
      </h2>
      {entries.length === 0 ? (
        <p className="mt-2 text-xs text-[var(--color-muted-deep)]">
          {t("session.historyEmpty")}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {newestFirst.map((entry) => (
            <li
              key={`${entry.round}-${entry.createdAt}`}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  {t("session.historyRound")} {entry.round}
                </span>
                <time
                  dateTime={entry.createdAt}
                  className="text-xs text-[var(--color-muted)]"
                  suppressHydrationWarning
                >
                  {new Date(entry.createdAt).toLocaleString()}
                </time>
              </div>
              <ul className="mt-2 space-y-1 font-mono text-xs text-[var(--color-text)]">
                {entry.votes.map((v) => (
                  <li key={`${entry.round}-${v.playerId}`}>
                    {v.playerName}: {v.vote || "—"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
