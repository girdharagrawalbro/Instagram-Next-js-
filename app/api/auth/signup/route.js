// pages/api/auth/signup.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  connectDB  from '../../../db'; // Update path as necessary
import User from '../../../models/User'; // Update path as necessary

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req) {
  try {
    const { email, fullname, username, password } = await req.json();

    await connectDB();
    
        const emailExists = await User.findOne({ email }).exec();
        if (emailExists) {
          return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

    // Check if the username or email already exists
    const usernameExists = await User.findOne({ username }).exec();
    if (usernameExists) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, fullname, username, password: hashedPassword });
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

    return NextResponse.json({ message: 'User created successfully', token }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Error adding user: ' + error.message }, { status: 500 });
  }
}
