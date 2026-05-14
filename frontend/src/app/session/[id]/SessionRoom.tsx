"use client";

import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayerList } from "@/components/PlayerList";
import { PokerCard } from "@/components/PokerCard";
import { VoteResults } from "@/components/VoteResults";
import { GET_SESSION } from "@/graphql/queries";
import { REVEAL_VOTES, VOTE } from "@/graphql/mutations";
import type { Session } from "@/types/session";

const CARDS = ["1", "2", "3", "5", "8", "13", "?"] as const;

type SessionQueryData = {
  session: Session | null;
};

type SessionRoomProps = {
  sessionId: string;
};

function playerHasVoted(vote?: string | null): boolean {
  return !!(vote && vote.length > 0);
}

export function SessionRoom({ sessionId }: SessionRoomProps) {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");

  const { data, loading, error } = useQuery<SessionQueryData>(GET_SESSION, {
    variables: { id: sessionId },
    pollInterval: 2000,
    skip: !sessionId,
  });

  const [voteMutation, { loading: voting }] = useMutation(VOTE, {
    refetchQueries: [{ query: GET_SESSION, variables: { id: sessionId } }],
  });
  const [revealMutation, { loading: revealing }] = useMutation(REVEAL_VOTES, {
    refetchQueries: [{ query: GET_SESSION, variables: { id: sessionId } }],
  });

  const session = data?.session;

  if (!playerId) {
    return (
      <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-4 text-sm text-amber-100">
        <p className="font-medium">Missing player id</p>
        <p className="mt-2 text-amber-100/80">
          Open the session from{" "}
          <Link href="/" className="underline hover:text-white">
            home
          </Link>{" "}
          after creating or joining so your vote can be attributed.
        </p>
      </div>
    );
  }

  if (loading && !session) {
    return (
      <p className="text-sm text-slate-400" aria-live="polite">
        Loading session…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-400" role="alert">
        {error.message}
      </p>
    );
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
        <p>Session not found. Check the id or create a new session.</p>
        <Link href="/" className="mt-3 inline-block text-sky-400 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const currentSession = session;

  const me = currentSession.players.find((p) => p.id === playerId);
  const allVoted =
    currentSession.players.length > 0 &&
    currentSession.players.every((p) => playerHasVoted(p.vote));
  const isHost = currentSession.hostId === playerId;
  const canReveal = !currentSession.revealed && allVoted && isHost;

  async function pickCard(value: string) {
    if (!currentSession.revealed) {
      await voteMutation({
        variables: { sessionId: currentSession.id, playerId, value },
      });
    }
  }

  async function reveal() {
    await revealMutation({ variables: { sessionId: currentSession.id } });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span>
          Polling every <strong className="text-slate-300">2s</strong>
        </span>
        {currentSession.revealed ? (
          <span className="rounded-full bg-emerald-900/50 px-2 py-0.5 text-emerald-300">
            Revealed
          </span>
        ) : (
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">
            Hidden
          </span>
        )}
      </div>

      <PlayerList
        players={currentSession.players}
        revealed={currentSession.revealed}
        currentPlayerId={playerId}
      />

      {currentSession.revealed ? (
        <VoteResults players={currentSession.players} />
      ) : null}

      {!currentSession.revealed ? (
        <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="text-sm font-semibold text-slate-200">Your vote</h2>
          <p className="mt-1 text-xs text-slate-500">
            Values stay hidden until the host reveals after everyone has voted.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CARDS.map((c) => (
              <PokerCard
                key={c}
                label={c}
                selected={me?.vote === c}
                disabled={voting}
                onPick={() => pickCard(c)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {canReveal ? (
        <button
          type="button"
          disabled={revealing}
          onClick={() => reveal()}
          className="rounded bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50"
        >
          {revealing ? "Revealing…" : "Reveal votes"}
        </button>
      ) : null}

      {!currentSession.revealed && allVoted && !isHost ? (
        <p className="text-xs text-slate-500">
          Everyone voted — waiting for the host to reveal.
        </p>
      ) : null}
    </div>
  );
}
