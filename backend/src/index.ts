import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/typeDefs.js";

const PORT = Number(process.env.PORT) || 4000;
const corsOrigin =
  process.env.FRONTEND_ORIGIN?.split(",").map((s) => s.trim()) ?? ["http://localhost:3000"];

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

app.listen(PORT, () => {
  console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
});
