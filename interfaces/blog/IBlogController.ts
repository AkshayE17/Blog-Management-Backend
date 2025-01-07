import { Request, Response } from "express";

export interface IBlogController {
  createBlog(req: Request, res: Response): Promise<void>;
  getBlog(req: Request, res: Response): Promise<void>;
  listBlogs(req: Request, res: Response): Promise<void>;
  updateBlog(req: Request, res: Response): Promise<void>;
  deleteBlog(req: Request, res: Response): Promise<void>;
  addComment(req: Request, res: Response): Promise<void>;
  likeBlog(req: Request, res: Response): Promise<void>;
  bookmarkBlog(req: Request, res: Response): Promise<void>;
}
