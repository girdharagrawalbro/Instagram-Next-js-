// pages/api/users/not-following.js
import connectDB from '../../../db';
import User from '../../../models/User';
import { verifyToken } from '../../../utils/auth';

export const GET = async (req) => {
  try {
    await connectDB();
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    const loggedInUserId = decodedToken.userId;

    // Find the users whom the logged-in user is not following
    const loggedInUser = await User.findById(loggedInUserId).exec();

    const usersNotFollowing = await User.find({ 
      _id: { $ne: loggedInUserId, $nin: loggedInUser.following }
    }).exec();

    return new NextResponse(JSON.stringify(usersNotFollowing), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
