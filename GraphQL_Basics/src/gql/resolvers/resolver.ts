import { db } from "../../db.js";

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      return db.products.find((pd) => pd.id === args.productId);
    },

    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) => {
      return db.categories.find((category) => category.id === args.categoryId);
    },
  },

  Product: {
    category: ({ id }, args: any, context: any) => {
      return db.categories.find((category) => category.id === id);
    },
    reviews: ({ id }, args: any, context: any) => {
      return db.reviews.filter((review) => review.productId === id);
    },
  },

  Category: {
    products: ({ id }, args: any, context: any) => {
      return db.products.filter((product) => product.categoryId === id);
    },
  },
};
