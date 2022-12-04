import { gql } from "@apollo/client";

export const CREATE_USER_QUERY = gql`
    mutation CreateUser($email: String!, $username: String!, $firstName: String!, $lastName: String!, $password: String!, $confirmPassword: String!) {
        createUser(email: $email, username: $username, firstName: $firstName, lastName: $lastName, password: $password, confirmPassword: $confirmPassword) {
            firstName
    }
}
`;

export const SIGNIN_USER_QUERY = gql`
    query ($email: String!, $password: String!) {
        signInUser(email: $email, password: $password) {
            id
            email
            firstName
            username
            lastName
            profilePhoto
            mode
        }
    }
`;