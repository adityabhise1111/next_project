import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { error } from "console";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("missing mail or pass ")
                }
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("no user found ")
                    }
                    const isValid = await bcrypt.compare(
                        credentials.password, user.password
                    )
                    if (!isValid) {
                        throw new Error("wrong password ")

                    }

                    return {
                        id: user._id.toString(),
                        //name : user.name,
                        email: user.email

                    }
                } catch (error) {
                    console.error("Auth err", error)
                    throw error

                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session;
        },
    },
    pages:{
        signIn: "/login",
        error: "/login",
    },
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET
};