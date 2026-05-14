"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JOIN_SESSION } from "@/graphql/mutations";

export function JoinSessionForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [joinSession, { loading, error }] = useMutation(JOIN_SESSION);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold text-white">Join session</h2>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Your name
        <input
          className="rounded border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-sky-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jamie"
          autoComplete="off"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300">
        Session code
        <input
          className="rounded border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-slate-100 outline-none focus:border-sky-500"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="Paste session id"
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !name.trim() || !sessionId.trim()}
        className="rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
      >
        {loading ? "Joining…" : "Join"}
      </button>
      {error ? (
        <p className="text-sm text-red-400">{error.message}</p>
      ) : null}
    </form>
  );
}
