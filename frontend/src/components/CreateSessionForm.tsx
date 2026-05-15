"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEventHandler } from "react";
import { CREATE_SESSION } from "@/graphql/mutations";
import { useI18n } from "@/providers/I18nProvider";

export function CreateSessionForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [name, setName] = useState("");
  const [createSession, { loading, error }] = useMutation(CREATE_SESSION);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const { data } = await createSession({ variables: { name: trimmed } });
    const session = data?.createSession;
    if (!session) return;
    const hostId = session.hostId;
    router.push(`/session/${session.id}?playerId=${encodeURIComponent(hostId)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
    >
      <h2 className="text-lg font-semibold text-[var(--color-text)]">{t("create.title")}</h2>
      <label className="flex flex-col gap-1 text-sm text-[var(--color-muted)]">
        {t("create.nameLabel")}
        <input
          className="rounded border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex"
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="rounded bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
      >
        {loading ? t("create.submitting") : t("create.submit")}
      </button>
      {error ? (
        <p className="text-sm text-[var(--color-danger)]">{error.message}</p>
      ) : null}
    </form>
  );
}
