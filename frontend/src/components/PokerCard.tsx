type PokerCardProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onPick: () => void;
};

export function PokerCard({
  label,
  selected,
  disabled,
  onPick,
}: PokerCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPick}
      className={[
        "flex h-14 min-w-[3rem] items-center justify-center rounded-lg border px-3 text-base font-semibold transition",
        selected
          ? "border-[var(--color-poker-selected-border)] bg-[var(--color-poker-selected-bg)] text-[var(--color-text)]"
          : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] hover:border-[var(--color-muted)]",
        disabled ? "cursor-not-allowed opacity-40" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
