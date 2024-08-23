// pages/api/posts/following.js
import connectDB from '../../../db';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { verifyToken } from '../../../utils/auth'; // Assuming you have a utility function to verify JWT

export const GET = async (req) => {
  try {
    await connectDB();
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    const loggedInUserId = decodedToken.userId;

    // Find the users the logged-in user follows
    const user = await User.findById(loggedInUserId).populate('following').exec();

    const posts = await Post.find({ userId: { $in: user.following } }).exec();

    if (!posts) {
      return new NextResponse(JSON.stringify({ error: 'No posts found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
