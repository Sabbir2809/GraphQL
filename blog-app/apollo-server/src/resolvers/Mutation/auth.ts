import bcrypt from "bcrypt";
import config from "../../config";
import { JWTGenerate } from "../../utils/jwt";

type TUserInfo = { name: string; email: string; password: string; bio?: string };

const authResolvers = {
  // registration
  registration: async (parent: any, args: TUserInfo, { prisma }: any) => {
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
          userId: Number(newUser.id),
          bio: args.bio,
        },
      });
    }

    const token = await JWTGenerate(
      { id: newUser.id, email: newUser.email },
      config.jwt.secret,
      config.jwt.expires_in
    );

    return {
      userError: null,
      token,
    };
  },

  // login
  login: async (parent: any, args: TUserInfo, { prisma }: any) => {
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
      { id: user.id, email: user.email },
      config.jwt.secret,
      config.jwt.expires_in
    );

    return {
      userError: null,
      token,
    };
  },
};
export default authResolvers;
