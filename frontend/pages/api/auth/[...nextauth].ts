import nextAuth, { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Credentials from "next-auth/providers/credentials";
import { client } from "../../../graphql/apollo-client";
import { SIGNIN_USER_QUERY } from "../../../graphql/queries/auth";
import { IUser } from "../../../utils/types";

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sigin"
    },
    providers: [
        Credentials({
            name: "Sign in with DiGG",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
                password: { label: "Password", type: "password", placeholder: "" }
            },
            async authorize(credentials): Promise<IUser | null> {
                const email = credentials?.email;
                const password = credentials?.password;
                try {
                    const response = await client.query<{ signInUser: IUser }>({
                        query: SIGNIN_USER_QUERY,
                        variables: {
                            email,
                            password
                        },
                    });
                    return response.data.signInUser;
                } catch (e: any) {
                    return null;
                }
            },

        })
    ],
    secret: "secret",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        }
    }
}

export default nextAuth(authOptions);
