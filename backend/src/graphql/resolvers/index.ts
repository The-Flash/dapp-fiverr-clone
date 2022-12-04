import merge from "lodash.merge";
import categoriesResolvers from "./categories";
import usersResolvers from "./users";

const resolvers = merge(
    {},
    categoriesResolvers,
    usersResolvers
);

export default resolvers;