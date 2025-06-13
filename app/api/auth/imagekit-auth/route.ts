// This file is part of the Next.js application and handles ImageKit authentication for uploads.
// It uses the ImageKit SDK to generate upload authentication parameters.
import { getUploadAuthParams } from "@imagekit/next/server"
export async function GET() {
    try {
        // Your application logic to authenticate the user
        // For example, you can check if the user is logged in or has the necessary permissions
        // If the user is not authenticated, you can return an error response

        const authParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        })

        return Response.json(
            {
                authParameters,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
            }
        )
    } catch (error) {
        console.error("Error generating upload auth parameters:", error)
        return Response.json(
            { error: "Failed to generate upload auth parameters" },
            { status: 500 }
        )
    }
}