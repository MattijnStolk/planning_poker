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
          ? "border-sky-400 bg-sky-900/60 text-white"
          : "border-slate-600 bg-slate-900 text-slate-100 hover:border-slate-400",
        disabled ? "cursor-not-allowed opacity-40" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
