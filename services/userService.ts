
import { userRepository } from "../repositories/userRepository";
import { IUser } from "../models/user";
import {generatePresignedUrl} from "../config/s3";
import { IUserService } from "../interfaces/users/IUserService";
import { IUserRepository } from "../interfaces/users/IUserRepository";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from '../config/token'
import { hashPassword } from '../config/pass'

class UserService implements IUserService {
  constructor(private _userRepository: IUserRepository) {}
  async createUser(userData: IUser) {
    try {
        const existingUser = await this._userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }


        userData.password = await hashPassword(userData.password);

        const newUser = await this._userRepository.create(userData);

        return newUser;
    }catch (error: unknown) {
            if (error instanceof Error) {
              console.error("Error registering user:", error);
              throw new Error(`Failed to register user: ${error.message}`);
            } else {
              console.error("An unknown error occurred:", error);
              throw error;
            }
          }
}

  async getUserById(id: string): Promise<IUser | null> {
    return this._userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this._userRepository.findByEmail(email);
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
        // If a password is provided in the update request, hash it before saving
        if (data.password) {
            data.password = await hashPassword(data.password); // Use the same utility as in `createUser`
        }

        const updatedUser = await this._userRepository.updateById(id, data);

        if (!updatedUser) {
            throw new Error('User not found or update failed');
        }

        return updatedUser;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error updating user:", error);
            throw new Error(`Failed to update user: ${error.message}`);
        } else {
            console.error("An unknown error occurred:", error);
            throw error;
        }
    }
}

  async deleteUser(id: string): Promise<IUser | null> {
    return this._userRepository.deleteById(id);
  }

  async listUsers(): Promise<IUser[]> {
    return this._userRepository.findAll();
  }

  async loginUser(email: string, password: string) {
    try {
        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isVerified) {
            throw new Error('User is not verified.');
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid password.');
        }

        if (user.isBlocked === true) {
            throw new Error('User is blocked');
        }

        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = generateRefreshToken(user._id as string);

        return { user, accessToken, refreshToken };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error logging in user:", error);
            throw new Error(error.message);
        } else {
            console.error("An unknown error occurred:", error);
            throw error;
        }
    }
}

  async getPresignedUrl(fileName: string, fileType: string): Promise<string> {
    return generatePresignedUrl(fileName, fileType);
  }
}


export const userService = new UserService(userRepository);
