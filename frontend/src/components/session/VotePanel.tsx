"use client";

import { PokerCard } from "@/components/PokerCard";
import { useI18n } from "@/providers/I18nProvider";

const CARDS = ["1", "2", "3", "5", "8", "13", "?"] as const;

type VotePanelProps = {
  selectedVote?: string | null;
  disabled?: boolean;
  onPick: (value: string) => void;
};

export function VotePanel({ selectedVote, disabled, onPick }: VotePanelProps) {
  const { t } = useI18n();
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="text-sm font-semibold text-[var(--color-text)]">
        {t("session.yourVote")}
      </h2>
      <p className="mt-1 text-xs text-[var(--color-muted-deep)]">
        {t("session.voteHint")}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CARDS.map((c) => (
          <PokerCard
            key={c}
            label={c}
            selected={selectedVote === c}
            disabled={disabled}
            onPick={() => onPick(c)}
          />
        ))}
      </div>
    </section>
  );
}
