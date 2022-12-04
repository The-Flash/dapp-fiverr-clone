import { gql } from "apollo-server-core";

const typeDefs = gql`
    type Category {
        id: String
        name: String
        image: String
        slug: String
    }

    type Query {
        categories: [Category]
    }
`;

export default typeDefs;