import { IBlogRepository } from "../interfaces/blog/IBlogRepository";
import { Blog, IBlog, IComment } from "../models/blog";

class BlogRepository implements IBlogRepository {
  async create(blogData: Partial<IBlog>): Promise<IBlog> {
    const blog = new Blog(blogData);
    return blog.save();
  }

  async findById(id: string): Promise<IBlog | null> {
    return Blog.findById(id).populate("author").populate("comments.userId");
  }

  async findAll(): Promise<IBlog[]> {
    return Blog.find().populate("author");
  }

  async updateById(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IBlog | null> {
    return Blog.findByIdAndDelete(id);
  }

  async addComment(blogId: string, commentData: Partial<IComment>): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: commentData } },
      { new: true }
    );
  }

  async likeBlog(blogId: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } }, { new: true });
  }

  async bookmarkBlog(blogId: string, userId: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { bookmarks: userId } },
      { new: true }
    );
  }
}

export const blogRepository = new BlogRepository();
