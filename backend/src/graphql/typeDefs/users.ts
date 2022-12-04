import { gql } from "apollo-server-core";

const typeDefs = gql`
    type User {
        id: String
        username: String
        firstName: String
        lastName: String
        email: String
        profilePhoto: String
        mode: String
    }

    type Query {
        signInUser(
            email: String!,
            password: String!
        ): User

    }

    type Mutation {
        createUser(
            email: String!,
            username: String!,
            firstName: String!,
            lastName: String!,
            password: String!,
            confirmPassword: String!
        ): User

        uploadProfilePhoto(url: String!): String
    }
`;

export default typeDefs;