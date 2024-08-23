import connectDB from '../../../db';
import User from '../../../models/User';
import { NextResponse } from 'next/server';


export const GET = async (req) => {
  
  try {
    const userId = req.headers.get('userId');
    await connectDB();

    const user = await User.findById(userId).populate('following');
    
    const followingIds = user.following.map(f => f._id);
    const { interests } = user;

    // Suggest users based on mutual followers and interests
    const suggestedUsers = await User.find({
      _id: { $ne: userId, $nin: followingIds },
      $or: [
        { followers: { $in: followingIds } },
        { interests: { $regex: interests, $options: 'i' } },
      ],
    }).limit(10);

    return new NextResponse(JSON.stringify(suggestedUsers), { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch suggestions ' + error.message }), { status: 500 }); 
  }
};
