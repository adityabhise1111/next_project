"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import { signIn } from "next-auth/react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result  = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        })

        if(result?.error) {
            // Handle error case
            console.error("Login failed:", result.error);
            alert("Login failed. Please check your credentials.");
        }else{
            // Handle success case
            console.log("Login successful");
            alert("Login successful!");
            router.push("/"); // Redirect to the home page or any other page after successful login
        }
    }


    
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        <div>
            <p>Don't have an account? <a href="/register">Register here</a></p>
            <button onClick={()=> signIn("google") }>Sign In With Google</button>
        </div>
        
    </div>
  )
}

export default LoginPage