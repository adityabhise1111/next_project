// This file handles authentication using NextAuth.js
//this will be used in the app/api/auth/[...nextauth]/route.ts file
//as handler for the GET and POST requests coming to the auth route
//
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export{handler as GET , handler as POST};

