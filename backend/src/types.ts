import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface GraphQLContext {
    prisma: PrismaClient;
    session: Session | null;
}