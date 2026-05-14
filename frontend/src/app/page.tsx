import Link from "next/link";
import { CreateSessionForm } from "@/components/CreateSessionForm";
import { JoinSessionForm } from "@/components/JoinSessionForm";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Scrum Poker
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Create or join a session, vote with poker cards, reveal when everyone
          is ready.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <CreateSessionForm />
        <JoinSessionForm />
      </div>
      <p className="text-center text-xs text-slate-600">
        Assessment build — in-memory only, polling updates every 2s.
      </p>
      <div className="text-center">
        <Link href="/" className="text-xs text-slate-500 hover:text-slate-400">
          Refresh home
        </Link>
      </div>
    </main>
  );
}
