import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        interface RegisterRequestBody {
            email: string;
            password: string;
        }
        const { email, password }: RegisterRequestBody = await request.json();
        if (!email||!password) {
            return NextResponse.json(
                {error: "email and pass are required "},
                {status: 400}  
            )
            
        }
        await connectToDatabase()

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