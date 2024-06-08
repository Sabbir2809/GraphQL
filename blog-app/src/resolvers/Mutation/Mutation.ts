import authResolvers from "./auth";
import postResolvers from "./post";

type TUserInfo = { name: string; email: string; password: string; bio?: string };

export const Mutation = {
  // auth
  ...authResolvers,
  // add post
  ...postResolvers,
};
