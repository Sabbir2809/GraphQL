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
    
  type AuthPayload {
    userError: String
    token: String
  }

  type Query {
    me(id: Int): User
    users: [User]
    posts: [Post]
  }

  type Mutation {
    registration(name: String!, email: String!, password: String!, bio: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
