import { db } from "../../db.js";
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    Query: {
        products: () => db.products,
        product: (parent, args, context) => {
            return db.products.find((pd) => pd.id === args.productId);
        },
        categories: () => db.categories,
        category: (parent, args, context) => {
            return db.categories.find((category) => category.id === args.categoryId);
        },
    },
    Product: {
        category: ({ id }, args, context) => {
            return db.categories.find((category) => category.id === id);
        },
        reviews: ({ id }, args, context) => {
            return db.reviews.filter((review) => review.productId === id);
        },
    },
    Category: {
        products: ({ id }, args, context) => {
            return db.products.filter((product) => product.categoryId === id);
        },
    },
};
