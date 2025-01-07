import { IBlogService } from "../interfaces/blog/IBlogService";
import { IBlog } from "../models/blog";
import { IBlogRepository } from "../interfaces/blog/IBlogRepository";
import { blogRepository } from "../repositories/blogRepository";

class BlogService implements IBlogService {
  constructor(private _blogRepository: IBlogRepository) {}
  async createBlog(blogData: Partial<IBlog>): Promise<IBlog> {
    return this._blogRepository.create(blogData);
  }

  async getBlogById(id: string): Promise<IBlog | null> {
    return this._blogRepository.findById(id);
  }

  async listBlogs(): Promise<IBlog[]> {
    return this._blogRepository.findAll();
  }

  async updateBlog(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    return this._blogRepository.updateById(id, data);
  }

  async deleteBlog(id: string): Promise<IBlog | null> {
    return this._blogRepository.deleteById(id);
  }

  async addComment(blogId: string, commentData: { userId: string; comment: string }): Promise<IBlog | null> {
    return this._blogRepository.addComment(blogId, commentData);
  }

  async likeBlog(blogId: string): Promise<IBlog | null> {
    return this._blogRepository.likeBlog(blogId);
  }

  async bookmarkBlog(blogId: string, userId: string): Promise<IBlog | null> {
    return this._blogRepository.bookmarkBlog(blogId, userId);
  }
}

export const blogService = new BlogService(blogRepository);
