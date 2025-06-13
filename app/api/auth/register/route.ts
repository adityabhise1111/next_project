// This file handles user registration in a Next.js application.
// It connects to a MongoDB database, checks if the user already exists,   

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) { 
    //the NextRequest type is used to handle the incoming request
    //NextRequest is a built-in type in Next.js that represents the incoming request object
    //it is used to access the request body, headers, and other properties of the request


    try {
        // Define the expected structure of the request body
        // using an interface to ensure type safety
        interface RegisterRequestBody {
            email: string;
            password: string;
        }

        // Parse the JSON body of the request
        // and destructure the email and password properties
        //its by default a JSON request
        //so we can use request.json() to get the bodyof the request
        const { email, password }: RegisterRequestBody = await request.json();
        if (!email||!password) {
            return NextResponse.json(
                {error: "email and pass are required "},
                {status: 400}  
            )
            
        }
        await connectToDatabase()

        //now from here next is typical registration code

        const exsistingUser  = await User.findOne({email})
        if( exsistingUser){
            return NextResponse.json(
                {error: "YE email to pehlehi db me hai dusra kar ya to login kr"},
                {status: 400}  
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
                {message: "Ho Gaya Register"},
                {status: 400}  
            )

    } catch (error) {
        console.error("Registration error", error)
        return NextResponse.json(
                {error: "Nahi Ho Pa Raha"},
                {status: 400} 
            );
        
    }
}