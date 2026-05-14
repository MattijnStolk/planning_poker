import Link from "next/link";
import { Suspense } from "react";
import { SessionRoom } from "./SessionRoom";

type SessionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Session</h1>
          <p className="mt-1 font-mono text-xs text-slate-400 break-all">
            {id}
          </p>
        </div>
        <Link
          href="/"
          className="rounded border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
        >
          Home
        </Link>
      </div>
      <Suspense
        fallback={
          <p className="text-sm text-slate-400" aria-live="polite">
            Loading session…
          </p>
        }
      >
        <SessionRoom sessionId={id} />
      </Suspense>
    </main>
  );
}
