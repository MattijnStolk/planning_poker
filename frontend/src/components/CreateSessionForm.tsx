"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CREATE_SESSION } from "@/graphql/mutations";

export function CreateSessionForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [createSession, { loading, error }] = useMutation(CREATE_SESSION);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const { data } = await createSession({ variables: { name: trimmed } });
    const session = data?.createSession;
    if (!session) return;
    const hostId = session.hostId;
    router.push(`/session/${session.id}?playerId=${encodeURIComponent(hostId)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold text-white">Create session</h2>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Your name
        <input
          className="rounded border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-sky-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex"
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="rounded bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create & enter"}
      </button>
      {error ? (
        <p className="text-sm text-red-400">{error.message}</p>
      ) : null}
    </form>
  );
}
