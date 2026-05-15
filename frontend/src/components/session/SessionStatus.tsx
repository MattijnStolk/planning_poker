"use client";

import { useI18n } from "@/providers/I18nProvider";

type SessionStatusProps = {
  revealed: boolean;
};

export function SessionStatus({ revealed }: SessionStatusProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
      <span>
        {t("session.polling")}{" "}
        <strong className="text-[var(--color-text)]">{t("session.pollingSeconds")}</strong>
      </span>
      {revealed ? (
        <span className="rounded-full bg-[var(--color-chip-success-bg)] px-2 py-0.5 text-[var(--color-chip-success-text)]">
          {t("session.revealed")}
        </span>
      ) : (
        <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-muted)] border border-[var(--color-border-muted)]">
          {t("session.hidden")}
        </span>
      )}
    </div>
  );
}
