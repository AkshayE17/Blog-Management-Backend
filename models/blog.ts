// models/blog.ts
import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  userId: string; 
  comment: string;
  likes: number; 
}

export interface IBlog extends Document {
  title: string;
  content: string;
  imageUrl:string;
  author: string; 
  authorId: string;
  likes: number; 
  bookmarks: string[]; 
  comments: IComment[]; 
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    userId: { type: String, ref: "User", required: true },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    author: { type: String, required: true },
    authorId:{type: String, required: true},
    likes: { type: Number, default: 0 },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
