"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/client";
import { I18nProvider } from "./I18nProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </I18nProvider>
  );
}
