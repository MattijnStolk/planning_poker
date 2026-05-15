import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { LanguageToggle } from "@/components/LanguageToggle";

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
      <body className="min-h-screen antialiased">
        <AppProviders>
          <div className="flex justify-end px-4 pt-3">
            <LanguageToggle />
          </div>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
