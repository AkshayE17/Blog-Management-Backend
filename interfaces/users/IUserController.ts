import { Request, Response } from "express";

export interface IUserController {
  createUser(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void> 
  getUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
  getPresignedUrl(req: Request, res: Response): Promise<void>;
  listUsers(req: Request, res: Response): Promise<void>;
}


