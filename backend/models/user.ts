import mongoose, { Document, Schema } from 'mongoose';

// Define the IUser type
export type IUser = Document & {
  name: string;
  email: string;
  password: string;
};

// Define the User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;