// pages/api/posts/[postId]/comments.js
import connectDB from '../../../../db';
import Post from '../../../../models/Post';

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { postId } = params;

    const post = await Post.findById(postId).populate('comments').exec();

    if (!post) {
      return new NextResponse(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(post.comments), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
