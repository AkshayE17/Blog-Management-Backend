import { IBlog } from "../../models/blog";
import { IComment } from "../../models/blog";

export interface IBlogRepository {
  create(blogData: Partial<IBlog>): Promise<IBlog>;
  findById(id: string): Promise<IBlog | null>;
  findAll(): Promise<IBlog[]>;
  updateById(id: string, data: Partial<IBlog>): Promise<IBlog | null>;
  deleteById(id: string): Promise<IBlog | null>;
  addComment(blogId: string, commentData: Partial<IComment>): Promise<IBlog | null>;
  likeBlog(blogId: string): Promise<IBlog | null>;
  bookmarkBlog(blogId: string, userId: string): Promise<IBlog | null>;
}
