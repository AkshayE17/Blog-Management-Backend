import { Request, Response } from "express";
import { IBlogController } from "../interfaces/blog/IBlogController";
import { IBlogService } from "../interfaces/blog/IBlogService";
import { blogService } from "../services/blogService";
import { HTTP_STATUS_CODES } from "../constants/statusCode";
import { MESSAGES } from "../constants/messages";

class BlogController implements IBlogController {
  constructor(private _blogService: IBlogService) {}

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.createBlog(req.body);
      res.status(HTTP_STATUS_CODES.CREATED).json(blog);
    } catch (error) {
      console.log("Error in createBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USER_CREATION_FAILED,
      });
    }
  }

  async getBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.getBlogById(req.params.id);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json(blog);
      }
    } catch (error) {
      console.log("Error in getBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.UNEXPECTED_ERROR,
      });
    }
  }

  async listBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await this._blogService.listBlogs();
      res.status(HTTP_STATUS_CODES.OK).json(blogs);
    } catch (error) {
      console.log("Error in listBlogs:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.UNEXPECTED_ERROR,
      });
    }
  }

  async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.updateBlog(req.params.id, req.body);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json(blog);
      }
    } catch (error) {
      console.log("Error in updateBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USER_UPDATE_FAILED,
      });
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.deleteBlog(req.params.id);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json({
          message: MESSAGES.USER_DELETED_SUCCESS,
        });
      }
    } catch (error) {
      console.log("Error in deleteBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.USER_DELETION_FAILED,
      });
    }
  }

  async addComment(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.addComment(req.params.id, req.body);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json(blog);
      }
    } catch (error) {
      console.log("Error in addComment:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.UNEXPECTED_ERROR,
      });
    }
  }

  async likeBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.likeBlog(req.params.id);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json(blog);
      }
    } catch (error) {
      console.log("Error in likeBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.UNEXPECTED_ERROR,
      });
    }
  }
    
  async bookmarkBlog(req: Request, res: Response): Promise<void> {
    try {
      const blog = await this._blogService.bookmarkBlog(req.params.id, req.body.userId);
      if (!blog) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
          message: MESSAGES.USER_NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json(blog);
      }
    } catch (error) {
      console.log("Error in bookmarkBlog:", error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: MESSAGES.UNEXPECTED_ERROR,
      });
    }
  }
}

export const blogController = new BlogController(blogService);
