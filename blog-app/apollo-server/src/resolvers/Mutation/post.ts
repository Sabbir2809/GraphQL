import checkUserAccess from "../../utils/checkUserAccess";

const postResolvers = {
  // add post
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and Content is Required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.id,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },

  // update post
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.id, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },

  // delete post
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.id, args.postId);
    if (error) {
      return error;
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      userError: null,
      post: deletedPost,
    };
  },

  // publish Post
  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized!",
        post: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.id, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};

export default postResolvers;
