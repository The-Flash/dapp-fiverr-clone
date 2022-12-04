import { Category } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { GraphQLContext } from "../../types";

const resolvers = {
    Query: {
        categories: async function(
            _: any,
            args: any,
            context: GraphQLContext
        ): Promise<Category[]> {
            const { prisma } = context;

            try {
                const categories = await prisma.category.findMany({});
                return categories;
            } catch(e: any) {
                console.log("error", e);
                throw new ApolloError(e?.message);
            }
        }
    }
}

export default resolvers;