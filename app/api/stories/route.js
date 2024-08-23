// pages/api/stories/[userId].js
import connectDB from '../../db';
import Stories from '../../models/Stories';
import mongoose from 'mongoose';
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const userId = req.headers.get('userId');

    // Ensure that the userId is present
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'userId header is missing' }), { status: 400 });
    }

    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch stories from the database for the specified userId
    const stories = await Stories.find({ userId: objectId }).exec();

    // If no stories are found, return a 404 status
    if (!stories || stories.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'No stories found' }), { status: 404 });
    }

    // Return the found stories with a 200 status
    return new NextResponse(JSON.stringify(stories), { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the process
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
