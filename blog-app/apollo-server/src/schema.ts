export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
    author: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    profile(userId: ID!): Profile

    posts: [Post]
  }

  type Mutation {
    registration(name: String!, email: String!, password: String!, bio: String): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addPost(post: PostInput!): PostPayload
    updatePost(postId: ID!, post: PostInput!): PostPayload
    deletePost(postId: ID!): PostPayload
    publishPost(postId: ID!): PostPayload
  }


  type AuthPayload {
    userError: String
    token: String
  }
  type PostPayload {
    userError: String
    post: Post
  }
  input PostInput {
    title: String
    content: String
  }
`;
