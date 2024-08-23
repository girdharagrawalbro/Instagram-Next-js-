import mongoose from 'mongoose';
const { Schema } = mongoose;

const FollowerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  follower_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Follower || mongoose.model('Follower', FollowerSchema);
