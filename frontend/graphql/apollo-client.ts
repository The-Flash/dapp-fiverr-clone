import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL,
    credentials: "include"
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});