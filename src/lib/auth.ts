import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient) as any,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 10000
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user = { ...session.user, id: user.id } as {
                id: string;
                name: string;
                email: string;
            };

            return session;
        }
    }
}