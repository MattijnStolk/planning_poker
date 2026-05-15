"use client";

import { useI18n } from "@/providers/I18nProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="flex items-center gap-2 text-xs text-[var(--color-muted)]"
      role="group"
      aria-label={t("language.label")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={
          locale === "en"
            ? "rounded px-2 py-1 font-semibold text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)]"
            : "rounded px-2 py-1 hover:text-[var(--color-text)]"
        }
      >
        {t("language.en")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("nl")}
        className={
          locale === "nl"
            ? "rounded px-2 py-1 font-semibold text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)]"
            : "rounded px-2 py-1 hover:text-[var(--color-text)]"
        }
      >
        {t("language.nl")}
      </button>
    </div>
  );
}
