const checkUserAccess = async (prisma: any, userId: any, postId: any) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return {
      userError: "User Not Found!",
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  if (!post) {
    return {
      userError: "Post not Found!",
      post: null,
    };
  }

  if (post.authorId !== user.id) {
    return {
      userError: "Post not owned by user!",
      post: null,
    };
  }
};

export default checkUserAccess;
