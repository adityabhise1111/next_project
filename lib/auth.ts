//config for next auth for authentication
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { error } from "console";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// this is sets up a custom credentials 
// login provider in NextAuth,
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

    //this is a callback function that is called
    //when a user is authenticated  
    // it is used to set the user id in the token
    // and session objects
    //next auth by default give both jwt and session
    // uses a database
    //to store the user session, but we are using
    //a JWT token to store the user session

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


    // this is the pages that next auth will redirect to
    // after a user has been authenticated
    pages:{
        signIn: "/login",   //if the user is not authenticated
                            // they will be redirected to this page
        error: "/login",    // if there is an error during authentication
        signOut: "/login",  // if the user signs out, they will be redirected to this page
    },
    session:{                        // this is the session configuration
        strategy:"jwt",              // we are using JWT for session management   
        maxAge: 30 * 24 * 60 * 60,   // session will expire after 30 days
    },
    secret: process.env.AUTH_SECRET , // this is the secret used to sign the JWT token
};