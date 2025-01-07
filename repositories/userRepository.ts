// repositories/user.repository.ts
import mongoose from "mongoose";
import { IUser } from "../models/user";

const User = mongoose.model<IUser>("User", new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true }));

class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();    
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error(`Error finding user with email: ${email}`, error);
      throw new Error("Error finding user by email");
    }
  }


  async updateById(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<IUser[]> {
    return User.find().exec();
  }
}

export const userRepository = new UserRepository();
