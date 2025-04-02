import mongoose, { Schema, Document, Model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence');

export type IPost = Document & {
  postID: number;
  user: mongoose.Types.ObjectId; // Reference to the User model
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const PostSchema = new Schema<IPost>(
  {
    postID: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key to User
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

PostSchema.plugin(AutoIncrementFactory(mongoose), { inc_field: 'postID' });

const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);
export default Post;
