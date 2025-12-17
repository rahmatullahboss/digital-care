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
                console.log("[Auth] authorize called with email:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("[Auth] Missing credentials");
                    return null;
                }

                try {
                    const db = await getD1Database();
                    console.log("[Auth] DB connection obtained");

                    const user = await db
                        .prepare("SELECT * FROM users WHERE email = ?")
                        .bind(credentials.email)
                        .first();

                    console.log("[Auth] User found:", !!user, user ? { email: user.email, role: user.role } : null);

                    if (!user) {
                        console.log("[Auth] No user found for email:", credentials.email);
                        return null;
                    }

                    const isPasswordValid = await compare(
                        credentials.password,
                        user.password_hash as string
                    );

                    console.log("[Auth] Password valid:", isPasswordValid);

                    if (!isPasswordValid) {
                        console.log("[Auth] Invalid password");
                        return null;
                    }

                    console.log("[Auth] Login successful for:", user.email);
                    return {
                        id: user.id as string,
                        email: user.email as string,
                        name: user.name as string,
                        role: user.role as string,
                    };
                } catch (error) {
                    console.error("[Auth] Error:", error);
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
