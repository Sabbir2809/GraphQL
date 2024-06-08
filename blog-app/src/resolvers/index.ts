import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "./../config";
import { JWTGenerate } from "./../utils/jwt";
const prisma = new PrismaClient();

type TUserInfo = { name: string; email: string; password: string; bio?: string };

export const resolvers = {
  Query: {
    // get all users
    users: async (parent: any, args: TUserInfo, context: any) => {
      return await prisma.user.findMany();
    },
    // get my profile
    me: async (parent: any, args: { id: number }, context: any) => {
      return await prisma.user.findFirstOrThrow({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    // registration
    registration: async (parent: any, args: TUserInfo, context: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (isExist) {
        return {
          userError: "Already this email register!",
          token: null,
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 8);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            userId: newUser.id,
            bio: args.bio,
          },
        });
      }

      const token = await JWTGenerate(
        { userId: newUser.id, email: newUser.email },
        config.jwt.secret,
        config.jwt.expires_in
      );

      return {
        userError: null,
        token,
      };
    },

    // login
    login: async (parent: any, args: TUserInfo, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          userError: "User Not Found!",
          token: null,
        };
      }

      const correctPassword = await bcrypt.compare(args.password, user.password);
      if (!correctPassword) {
        return {
          userError: "Incorrect Password!",
          token: null,
        };
      }

      const token = JWTGenerate(
        { userId: user.id, email: user.email },
        config.jwt.secret,
        config.jwt.expires_in
      );

      return {
        userError: null,
        token,
      };
    },
  },
};
