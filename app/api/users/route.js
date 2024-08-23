import connectDB from '../../db';
import User from '../../models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const GET = async (req, { params }) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.get('authorization');
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET); // Use your JWT secret key here
    } catch (err) {
      return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Connect to the database
    await connectDB();

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.userId).exec();

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return the user data
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching user data: ' + error.message }), { status: 500 });
  }
};
