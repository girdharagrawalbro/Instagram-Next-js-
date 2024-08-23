import { NextResponse } from "next/server";
import connectDB from "../../db";
import Post from "../../models/Post";

// Get all posts
export const GET = async (req) => {
  try {
    await connectDB();

    const posts = await Post.find();

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching posts: " + error.message, { status: 500 });
  }
};
