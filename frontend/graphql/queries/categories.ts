import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
    query Categories {
        categories {
            slug
            name
            image
        }
    }
`;