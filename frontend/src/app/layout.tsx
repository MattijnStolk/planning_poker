import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "Scrum Poker",
  description: "Minimal planning poker for assessments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
