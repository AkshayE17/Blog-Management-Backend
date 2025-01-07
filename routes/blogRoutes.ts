import { Router } from "express";
import { blogController } from "../controllers/blogController";

const blogRouter =Router();

blogRouter.post("/", (req, res) => blogController.createBlog(req, res));
blogRouter.get("/:id", (req, res) => blogController.getBlog(req, res));
blogRouter.get("/", (req, res) => blogController.listBlogs(req, res));
blogRouter.put("/:id", (req, res) => blogController.updateBlog(req, res));
blogRouter.delete("/:id", (req, res) => blogController.deleteBlog(req, res));
blogRouter.post("/:id/comments", (req, res) => blogController.addComment(req, res));
blogRouter.post("/:id/like", (req, res) => blogController.likeBlog(req, res));
blogRouter.post("/:id/bookmark", (req, res) => blogController.bookmarkBlog(req, res));

export default blogRouter;
