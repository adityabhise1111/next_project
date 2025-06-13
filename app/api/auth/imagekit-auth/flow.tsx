// Upload Flow Overview just discribing the flow in flow.tsx file
// this file is not a  functional code but rather a description of
// the upload flow using ImageKit SDK in a Next.js application.
// Here’s how the upload process using the SDK works:

// Client Request for Auth Parameters
// The client component calls an API route to fetch the authentication parameters.
// You can implement your own application logic within this route to authenticate the user.
// After that, use getUploadAuthParams to generate the upload credentials.

// File Upload
// Once the client has the auth parameters, it can call the .upload function with the necessary data.


/* 1 first creating app route in the app/api/auth/imagekit-auth/route.ts
    that is completely copied from next auth web documentation
    now modifying it to use the ImageKit SDK
    to generate upload authentication parameters.
   2 creating api endpoint api/video
    this doesnt inter fare with uploading
    inside it we create /route.ts file
    that handles the upload request from the client.
        
    //working of video upload
          front give info to back that give to imagekit
          now authorised it directly send file to imagekit
          and now front has data from form and from imagekit
          that is sent to backend and it stores in db
    3 video endpoint has 2 methods GET AND POST
        so creating a GET  and POST methods inside auth/video/route.ts
         in get 
         we are trting to connect to database
         then fetching all the videos from the database
         then returning the videos in json format

         in post 
         we are trying to connect to database
         but also checking if the user is authenticated
         then getting the video data from the request body
         then creating a new video in the database
         then returning the video in json format
*/