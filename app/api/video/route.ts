// This file is used to handle the video related API requests
// and is responsible for fetching and creating videos in the database.

import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

//getting all videos from the database GET method
export async function GET() {
    try {
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return NextResponse.json(
        //         { error: "not authorised " }, { status: 401 });
        // } 
        //not willing to auth for seeing video so commenting



        await connectToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).
            lean()

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
            //parsing to json format because 
            // its by default a javascript object and 
            // we need to return a json response because 
            // at frontend we are using fetch api
            // that expects a json response 
            // and passing empty array cause frontend
            // is expecting an array of videos
        }

        return NextResponse.json(videos);
        //passing videos to json response
        // this will return the videos in json format


    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch videos" }, { status: 500 });
    }
}

// POST method to create a new video
export async function POST(request: NextRequest) {
    try {
        //i want to that user must be authenticated to upload
        //getserversession is used to get the session of the user auth or not
        // authOptions is imported from lib/auth that is config for next auth

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "not authorised " }, { status: 401 });
        }

        //here if user is authenticated we get the request body
        await connectToDatabase();
        const body: IVideo = await request.json();

        //request is the incoming request object        --"request"
        //and we are getting the body of the request
        //and parsing it to json format                 --"json"
        // we need body to create a new video            "body"
        // casue body contains the video data
        // and we type it as IVideo cause in models/Video.ts
        // we have defined the IVideo interface         --"Ivideo"
        // so frontend will send the video data
        // in the form of IVideo interface
        // for handling it in right type we did it


        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ){
            return NextResponse.json(
                { error: "All fields are required" }, { status: 400 }
            );
        }
        //checking if all fields are present in the body  
        // now  creating video and saving it to the database
        const videodata = {
            ...body,
            controls: body?.controls ?? true, // default to  true if not provided
            transformation: {
                height: 1920,
                width: 1080,
                quality: body?.transforamation ?? 100, // default to 100 if not provided
            }
        };
        // we are creating a new video object so using {} brackets
        // ...body is used to spread the body object
        // spreading means we are taking all the properties ...body is euivalent to creating
        // a new object with all the properties of body   for example if body has properties
        // title, description, videoUrl, thumbnailUrl, controls, transformation 
        // then videodata will have all these properties
        // controls and transformation are optional properties  and videio data look like this
        // {
        //     title: body.title,               
        //     description: body.description,
        //     videoUrl: body.videoUrl,
        //  }
        // all other properties are optional  creating default values for them


        const newVideo = await Video.create(videodata);
        return NextResponse.json(newVideo)

    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json(
            { error: "Failed to create video" }, { status: 500 }
        );

    }
}