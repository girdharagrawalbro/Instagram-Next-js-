import mongoose from 'mongoose';
const { Schema } = mongoose;

const StoriesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  media:{
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Stories || mongoose.model('Stories', StoriesSchema);
