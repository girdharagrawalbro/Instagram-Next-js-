import mongoose from 'mongoose';
const { Schema } = mongoose;
const InteractionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: String, // e.g., 'like', 'comment', 'search'
    targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
});

const Interaction = mongoose.model('Interaction', InteractionSchema);