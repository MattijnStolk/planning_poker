"use client";

import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";

export function SessionMissingPlayer() {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border border-[var(--color-accent-warm-border)] bg-[var(--color-accent-warm-bg)] p-4 text-sm text-[var(--color-accent-warm)]">
      <p className="font-medium">{t("session.missingPlayerTitle")}</p>
      <p className="mt-2 opacity-90">
        {t("session.missingPlayerBeforeLink")}
        <Link href="/" className="underline hover:text-[var(--color-text)]">
          {t("session.missingPlayerLink")}
        </Link>
        {t("session.missingPlayerAfterLink")}
      </p>
    </div>
  );
}

export function SessionLoading() {
  const { t } = useI18n();
  return (
    <p className="text-sm text-[var(--color-muted)]" aria-live="polite">
      {t("session.loading")}
    </p>
  );
}

export function SessionError({ message }: { message: string }) {
  return (
    <p className="text-sm text-[var(--color-danger)]" role="alert">
      {message}
    </p>
  );
}

export function SessionNotFound() {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
      <p>{t("session.notFound")}</p>
      <Link
        href="/"
        className="mt-3 inline-block text-[var(--color-primary-hover)] hover:underline"
      >
        {t("session.backHome")}
      </Link>
    </div>
  );
}
