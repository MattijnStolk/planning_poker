"use client";

import Link from "next/link";
import { CreateSessionForm } from "@/components/CreateSessionForm";
import { JoinSessionForm } from "@/components/JoinSessionForm";
import { useI18n } from "@/providers/I18nProvider";

export function HomePage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
          {t("home.title")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{t("home.subtitle")}</p>
      </div>
      <div className="flex flex-col gap-6">
        <CreateSessionForm />
        <JoinSessionForm />
      </div>
      <div className="text-center">
        <Link
          href="/"
          className="text-xs text-[var(--color-muted-deep)] hover:text-[var(--color-muted)]"
        >
          {t("home.refresh")}
        </Link>
      </div>
    </main>
  );
}
