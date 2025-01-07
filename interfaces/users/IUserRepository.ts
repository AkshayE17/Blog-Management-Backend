import { IUser } from "../../models/user";

interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  updateById(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  deleteById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
}

export { IUserRepository };
