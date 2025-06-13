// This file handles authentication using NextAuth.js
//this will be used in the app/api/auth/[...nextauth]/route.ts file
//as handler for the GET and POST requests coming to the auth route
//
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export{handler as GET , handler as POST};

//the complete auth flow is going to be like this
/*
  NextAuth Authentication Flow (Step-by-Step):

  1. **User Registration:**
     - The user sends a POST request to the custom registration API at `app/api/auth/register/route.ts`.
     - This API receives the registration data (e.g., email, password),
         hashes the password, and saves the new user to the MongoDB database.
     - No session is created at this step; it only stores user data.

  2. **User Login:**
     - The user submits login credentials (email and password) to the NextAuth login endpoint 
        at `app/api/auth/[...nextauth]/route.ts`.
     - NextAuth uses the CredentialsProvider defined in `lib/auth.ts` to handle authentication.
     - The `authorize` function in the CredentialsProvider:
         a. Connects to the database using `connectToDatabase()`.
         b. Looks up the user by email.
         c. Compares the provided password with the hashed password in the database using bcrypt.
         d. If valid, returns a user object; otherwise, throws an error.
     - If authentication succeeds, NextAuth creates a session (JWT-based as configured).

  3. **Session Handling & Protected Routes:**
     - After login, the session object is returned to the client.
     - The session contains user info and a JWT token.
     - Protected API routes or pages can check for a valid session using NextAuth's session utilities.
     - If the session is valid, the user can access protected resources.

  4. **Logout:**
     - The user can log out by calling the sign-out endpoint at `app/api/auth/[...nextauth]/route.ts`.
     - NextAuth clears the session on the client and invalidates the JWT.

  **Key Points:**
    - Registration is handled by a custom API route, not by NextAuth directly.
      actually next auth discourages using it for registration
    - Login, session management, and logout are handled by NextAuth using providers and callbacks.
    - The CredentialsProvider enables custom logic for verifying user credentials against the database.
    - All database interactions (register, login) use promises for async operations.
    - The flow ensures secure handling of passwords and sessions using hashing and JWT.
*/