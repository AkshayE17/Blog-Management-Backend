import mongoose from "mongoose";

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  imageUrl?: string; 
  password: string;
  isVerified?: boolean;
  isBlocked?: boolean;
  isAdmin?: boolean;
}


const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
}, {
  timestamps: true
})