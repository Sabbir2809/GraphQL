import { userLoader } from "../dataLoaders/userLoader";

const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return userLoader.load(parent.authorId);
  },
};

export default Post;
