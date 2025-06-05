import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true },
  password: { 
    type: String, 
    required: true 
  },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;