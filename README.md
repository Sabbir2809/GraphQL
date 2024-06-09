# GraphQL

GraphQL is an API language for querying and mutation of data on the server. It uses a graph of types(objects) as a medium to communicate between client and server. GraphQL was invented by Facebook to solve the problem associated with REST.

GraphQL provides **flexibility, speed, and easy to use at simple to maintain**. Flexibility in terms of you can query only data that you want, in this case, the client told the server what data it wants instead of server sends data without caring of what is the need of the client.

In GraphQL, the client tells the server for what data is required, the server sends only that data to the client so the overload of unnecessary data reduces the speed in a request completion.

As per the developer’s perspective, GraphQL is very easy to implement, no need for version control, self-explanatory to the client, and easy to use in any client application whether it’s a web, mobile, or desktop application, and GraphQL server can be implemented in any language.

## REST vs GraphQL

**Difference between REST & GraphQL:**

- REST works by defining a unique combination of URLs and methods and managing operations on that end-points. On every end-point/URL client can perform Create, Read, Edit, or Delete operations by specifying URL+method and data necessary to complete the action.

- GraphQL provides a single end-point to every operation and the client can perform any operation by specifying input and output data to the method associated with that operation. If a client wants to create a user than the client has to only write a mutation query with User input data and what data it wants in return. No need to manage different endpoints or URLs.

## Where REST Design Pattern is lacking

- While talking about REST, developers have to study documents, and many times documents are very old written, so developers have to test end-points and figure out how to use them.

- When GraphQL methods can be reviewed, use easily, and in the case of making changes, it becomes easy to incorporate on both client and server-side.

## Advantages of GraphQL over REST

1. One great advantage GraphQL provides is built-in validation. Graphql validates unknown arguments, invalid argument types, not providing required arguments like cases are validated by GraphQL itself without writing a single line of code.

1. Graphql better fit into continuous integration and continuous delivery (CI/CD) pattern.

## Building Blocks of GraphQL

To build GraphQL server that responds to the query and mutate the data on your request you have to provide primary two arguments:

1. Schema definition
1. Resolver functions

### 1. Schema definitions

Schema definition declares what types of queries users can request and what data users allowed to ask in return. Below example demonstrate how to declare query:

```
type Query {
hello: String!
about(email:String!): String!
}
```

In this example, we have declared two methods first method hallo that returns the String, and the second method about accepts email and returns a string. Exclamatory sign at the end tells that parameters and their types are a must.

Same as Query we can also declare Mutations, subscriptions, own types(typeDefs) inside schema.

### 2. Resolver functions

Resolver functions are definitions of what is declared by the schema. Resolver functions are written the same as schema, but each function accepts four arguments parent, args, context, and info that helps operation completion.

Resolver functions can be written in any language of your choice, but here is the resolver function for the above schema definition written in NodeJS:

```gql
type Query {
  hello(parent, args, context, info) {
    return "Hello Welcome to the fabulous world of GraphQL";
  },
  about(parent, args, context, info) {
    let name = getNameFromEmail(args.email);
    return name;
  }
}
```

1. **parent** is the return value of the resolver for the particular field. Resolver for the parent field executes before resolver for the child.
1. **args** contains information about GraphQL arguments passed to the resolver function. Arguments can be accessed by args.email.
1. **context** object is shared across all the resolvers that execute for a particular operation. Use this to share information about authentication, database object, etc. that can be required to every resolver. In general, whatever you put inside context will be shared globally.
1. **info** contains information about the execution state of the operation.

_If one need to respond with an error, we just need to throw an error in the resolver function, GraphQL will automatically send an appropriate error response to the client._

## Working of GraphQL

**Scaler Types**: GraphQL work with below five scaler types:

1. **ID**: Can be Number/String used to store a unique identifier
1. **String**: Used to store string data as UTF-8 characters
1. **Boolean**: Used to store true/false
1. **Int**: Used to store 32-bit integer numbers
1. **Float**: Used to store double-precision floating-point numbers

GraphQL allows us to declare our own types that can be used to pass them as input or output of any GraphQL resolver function. The below example shows how we can make our own custom type in Graphql and use them in a query.

```gql
type User {
  id: ID
  name: String!
  age: Int!
  subscribed: Boolean!
}
type Query {
  users: [User!]
}
```

## Components of GraphQL

GraphQL works with three major Components

1. **Query**: Use for data reading operations and methods related to querying data are written inside the Query block. Below is the example schema for Query,

   ```gql
   type Query {
     user(email: String!): User!
   }
   ```

2. **Mutations**: Use for edit, delete operations, and methods are written inside the Mutation block. Below is the example schema for Mutation,

   ```gql
   type Mutation {
     createUser(email: String!, age: String!, subscribed: Boolean): User!
     editUser(id: ID!, email: String, age: String, subscribed: Boolean): User!
   }
   ```

3. **Subscriptions**: Uses WebSockets to notify about every data change to the client and methods are written inside the Subscription block. Below schema will notify about every change to the user for which ID is passed.

   ```gql
   type Subscription {
     user(id: ID!): User
   }
   ```

GraphQL removes the hassle of writing too many arguments in method every time. GraphQL also allows to create your own input types that you can use in the mutations or query. For example, we can write InputType for update user as below:

```gql
input UpdateUserType {
  name: String
  age: Int
  subscribed: Boolean
}
type mutation {
  editUser(id: ID, data: UpdateUserType): User
}
```

### Implementation Methodologies

Graphql is a design pattern similar to REST so that it can be written inside any language of your choice. You can develop a GraphQL server in JavaScript, Python, Java, etc.
