import { IUser } from "../../models/user";

interface IUserService {
  createUser(data: Partial<IUser>): Promise<IUser>;
  loginUser(email: string, password: string): Promise<{ user: IUser, accessToken: string, refreshToken: string }>;
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUser(id: string | undefined, data: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<IUser | null>;
  listUsers(): Promise<IUser[]>;
  getPresignedUrl(fileName: string, fileType: string): Promise<string>;
}

export { IUserService };
