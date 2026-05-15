"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { JOIN_SESSION } from "@/graphql/mutations";
import { useI18n } from "@/providers/I18nProvider";

export function JoinSessionForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [joinSession, { loading, error }] = useMutation(JOIN_SESSION);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedId = sessionId.trim();
    if (!trimmedName || !trimmedId) return;
    const { data } = await joinSession({
      variables: { sessionId: trimmedId, name: trimmedName },
    });
    const player = data?.joinSession;
    if (!player) return;
    router.push(
      `/session/${trimmedId}?playerId=${encodeURIComponent(player.id)}`
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
    >
      <h2 className="text-lg font-semibold text-[var(--color-text)]">{t("join.title")}</h2>
      <label className="flex flex-col gap-1 text-sm text-[var(--color-muted)]">
        {t("join.nameLabel")}
        <input
          className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-[var(--color-text)] outline-none focus:border-[var(--color-success)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jamie"
          autoComplete="off"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-[var(--color-muted)]">
        {t("join.codeLabel")}
        <input
          className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 font-mono text-[var(--color-text)] outline-none focus:border-[var(--color-success)]"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder={t("join.codePlaceholder")}
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !name.trim() || !sessionId.trim()}
        className="rounded bg-[var(--color-success)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--color-success-hover)] disabled:opacity-50"
      >
        {loading ? t("join.submitting") : t("join.submit")}
      </button>
      {error ? (
        <p className="text-sm text-[var(--color-danger)]">{error.message}</p>
      ) : null}
    </form>
  );
}
