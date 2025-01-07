import { IBlog } from "../../models/blog";

export interface IBlogService {
  createBlog(blogData: Partial<IBlog>): Promise<IBlog>;
  getBlogById(id: string): Promise<IBlog | null>;
  listBlogs(): Promise<IBlog[]>;
  updateBlog(id: string, data: Partial<IBlog>): Promise<IBlog | null>;
  deleteBlog(id: string): Promise<IBlog | null>;
  addComment(blogId: string, commentData: { userId: string; comment: string }): Promise<IBlog | null>;
  likeBlog(blogId: string): Promise<IBlog | null>;
  bookmarkBlog(blogId: string, userId: string): Promise<IBlog | null>;
}
