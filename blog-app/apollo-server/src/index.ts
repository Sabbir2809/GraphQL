import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { JwtPayload } from "jsonwebtoken";
import config from "./config";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { JWTVerify } from "./utils/jwt";

export const prisma = new PrismaClient();

type TContext = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: string | JwtPayload | null;
};

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<TContext> => {
      const userInfo = await JWTVerify(req.headers.authorization as string, config.jwt.secret);
      return {
        prisma,
        userInfo,
      };
    },
  });
  console.log(`🚀 Server ready at: ${url}`);
};
main();
