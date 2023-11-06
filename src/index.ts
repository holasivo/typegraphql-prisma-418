import "reflect-metadata"; // has to be first! https://typegraphql.com/docs/installation.html

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { applyResolversEnhanceMap, resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { personResolversEnhanceMap } from "./person";

const prisma = new PrismaClient();
applyResolversEnhanceMap(personResolversEnhanceMap);

async function bootstrap() {
  const schema = await buildSchema({ resolvers, validate: false });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    context: async () => ({ prisma }),
    listen: { port: 4000 },
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
