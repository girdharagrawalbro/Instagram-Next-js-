import mongoose from 'mongoose';
const { Schema } = mongoose;

const FollowSchema = new Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'User' },
    following: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  
  const Follow = mongoose.model('Follow', FollowSchema);