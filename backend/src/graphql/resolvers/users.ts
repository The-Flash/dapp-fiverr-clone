import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import { checkPassword, hashPassword } from "../../services/passwordHash";
import { GraphQLContext } from "../../types";

const resolvers = {
    Query: {
        signInUser: async function(
            _: any,
            args: {
                email: string,
                password: string
            },
            context: GraphQLContext
        ): Promise<User> {
            const  { email, password } = args;
            const { prisma } = context;
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if(user === null) {
                throw new ApolloError("Incorrect email/password");
            }
            const hashedPassword = user.password;
            const isValid = await checkPassword(password, hashedPassword);
            if(!isValid) {
                throw new ApolloError("Incorrect email/password");
            }
            return user;
        }
    },
    Mutation: {
        createUser: async function (
            _: any,
            args: {
                email: string,
                username: string,
                firstName: string,
                lastName: string,
                password: string,
                confirmPassword: string
            },
            context: GraphQLContext
        ): Promise<User> {
            const {
                email,
                username,
                password,
                confirmPassword,
                lastName,
                firstName
            } = args;
            if (password !== confirmPassword) {
                throw new ApolloError("Passwords must be equal");
            }

            const { prisma } = context;
            const userByEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (userByEmail !== null) {
                throw new ApolloError("A user with this email already exists");
            }

            const userByUsername = await prisma.user.findUnique({
                where: {
                    username
                }
            });

            if (userByUsername !== null) {
                throw new ApolloError("A user with this username already exists");
            }
            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    firstName,
                    lastName,
                    password: hashedPassword
                }
            });
            return user;
        },

        uploadProfilePhoto: async function(
            _: any,
            args: {
                url: string,
            },
            context: GraphQLContext
        ): Promise<string> {
            const { prisma, session } = context;

            if(session?.user === null) {
                throw new ApolloError("Unauthorized");
            }

            await prisma.user.update({
                where: {
                    email: session?.user?.email as string
                },
                data: {
                    profilePhoto: args.url
                }
            })
            return "Success";
        }
    }
}

export default resolvers;