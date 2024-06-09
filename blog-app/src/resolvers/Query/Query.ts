export const Query = {
  // get all users
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },

  // get me
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: userInfo.id,
      },
    });
  },

  // get my profile
  profile: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },

  // all post
  posts: async (parent: any, args: any, { prisma }: any) => {
    console.log("Post:");
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
