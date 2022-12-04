import * as dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema"
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { GraphQLContext } from "./types";

import { getSession } from "next-auth/react";
import morgan from "morgan";
import { upload } from "./services/file-upload";
import { fileUploadHandler } from "./api/controllers";
import cors from "cors";

dotenv.config();

console.log(process.env.CLIENT_URL);

const main = async () => {
    const app = express();
    app.use(morgan("dev"));
    // app.use(cookieParser())

    // REST ENDPOINTs
    app.use(cors({
        origin: process.env.CLIENT_URL as string,
        credentials: true
    }));

    app.post("/upload-file", upload.single("file"), fileUploadHandler);
    // END

    const httpServer = createServer(app);
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const prisma = new PrismaClient();
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        context: async ({ req, res }): Promise<GraphQLContext | null> => {
            const session = await getSession({ req });

            return { prisma, session }
        }
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: "/graphql",
        cors: {
            origin: process.env.CLIENT_URL as string,
            credentials: true,
        }
    });
    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
    });
}

main().catch((err: any) => console.log(err));