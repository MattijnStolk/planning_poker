"use client";

import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PlayerList } from "@/components/PlayerList";
import { VoteResults } from "@/components/VoteResults";
import {
  SessionError,
  SessionLoading,
  SessionMissingPlayer,
  SessionNotFound,
} from "@/components/session/SessionMessages";
import { SessionStatus } from "@/components/session/SessionStatus";
import { VotePanel } from "@/components/session/VotePanel";
import { GET_SESSION } from "@/graphql/queries";
import { RESET_VOTES, VOTE } from "@/graphql/mutations";
import { useI18n } from "@/providers/I18nProvider";
import type { Session } from "@/types/session";

type SessionQueryData = {
  session: Session | null;
};

type SessionRoomProps = {
  sessionId: string;
};

export function SessionRoom({ sessionId }: SessionRoomProps) {
  const { t } = useI18n();
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
  const [resetMutation, { loading: resetting }] = useMutation(RESET_VOTES, {
    refetchQueries: [{ query: GET_SESSION, variables: { id: sessionId } }],
  });

  const session = data?.session;

  if (!playerId) {
    return <SessionMissingPlayer />;
  }

  if (loading && !session) {
    return <SessionLoading />;
  }

  if (error) {
    return <SessionError message={error.message} />;
  }

  if (!session) {
    return <SessionNotFound />;
  }

  const currentSession = session;
  const me = currentSession.players.find((p) => p.id === playerId);
  const isHost = currentSession.hostId === playerId;
  const canNextGuess = currentSession.revealed && isHost;

  async function pickCard(value: string) {
    if (!currentSession.revealed) {
      await voteMutation({
        variables: {
          sessionId: currentSession.id,
          playerId,
          value,
        },
      });
    }
  }

  async function nextGuess() {
    await resetMutation({
      variables: { sessionId: currentSession.id, playerId },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {t("session.title")}
          </h1>
          <p className="mt-1 font-mono text-xs text-[var(--color-muted)] break-all">
            {sessionId}
          </p>
        </div>
        <Link
          href="/"
          className="rounded border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-muted)] hover:bg-[var(--color-surface)]"
        >
          {t("session.home")}
        </Link>
      </div>

      <SessionStatus revealed={currentSession.revealed} />

      <PlayerList
        players={currentSession.players}
        revealed={currentSession.revealed}
        currentPlayerId={playerId}
      />

      {currentSession.revealed ? (
        <VoteResults players={currentSession.players} />
      ) : null}

      {!currentSession.revealed ? (
        <VotePanel
          selectedVote={me?.vote}
          disabled={voting}
          onPick={pickCard}
        />
      ) : null}

      {canNextGuess ? (
        <button
          type="button"
          disabled={resetting}
          onClick={() => nextGuess()}
          className="rounded bg-[var(--color-warning)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-warning-hover)] disabled:opacity-50"
        >
          {resetting ? t("session.nextGuessLoading") : t("session.nextGuess")}
        </button>
      ) : null}
    </div>
  );
}
