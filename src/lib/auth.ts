import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getD1Database } from "./db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const db = await getD1Database();
                    const user = await db
                        .prepare("SELECT * FROM users WHERE email = ?")
                        .bind(credentials.email)
                        .first();

                    if (!user) {
                        return null;
                    }

                    const isPasswordValid = await compare(
                        credentials.password,
                        user.password_hash as string
                    );

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.id as string,
                        email: user.email as string,
                        name: user.name as string,
                        role: user.role as string,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin-login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};
