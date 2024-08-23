import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
