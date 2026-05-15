import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { resolvers } from "./schema/sessionResolvers.js";
import { typeDefs } from "./schema/typeDefs.js";

const PORT = Number(process.env.PORT) || 4000;

function parseCorsOrigins(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return ["http://localhost:3000"];
  }
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

const corsOrigin = parseCorsOrigins(process.env.FRONTEND_ORIGIN);

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({ origin: corsOrigin }),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({}),
  })
);

const httpServer = app.listen(PORT, () => {
  console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
});

httpServer.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `[backend] Port ${PORT} is already in use. Stop the other process or set PORT to a free port (e.g. PORT=4001 npm run start --prefix backend).`
    );
  } else {
    console.error("[backend] HTTP server error:", err);
  }
  process.exit(1);
});
