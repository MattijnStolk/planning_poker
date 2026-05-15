import { Suspense } from "react";
import { SessionRoom } from "@/components/session/SessionRoom";
import { SessionLoading } from "@/components/session/SessionMessages";

type SessionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <Suspense fallback={<SessionLoading />}>
        <SessionRoom sessionId={id} />
      </Suspense>
    </main>
  );
}
