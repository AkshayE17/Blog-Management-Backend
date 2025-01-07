import { Request, Response } from "express";
import { userService } from "../services/userService";
import { otpService } from "../services/otpService";
import { HTTP_STATUS_CODES } from "../constants/statusCode";
import { MESSAGES } from "../constants/messages";
import {IUserController} from "../interfaces/users/IUserController";
import { IOtpService } from "../interfaces/otp/IOtpService";
import { IUserService } from "../interfaces/users/IUserService";

class UserController implements IUserController {
  constructor(private _userService:IUserService,private _otpService:IOtpService) {}
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this._userService.createUser(req.body);
      await this._otpService.sendOtpToEmail(req.body.email);
      res.status(HTTP_STATUS_CODES.CREATED).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.USER_CREATION_FAILED });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await this._userService.loginUser(email, password);
  
  
        res.cookie('userRefreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY as string, 10),
            sameSite: 'strict',
        });

        res.cookie('userAccessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY as string, 10),
          sameSite: 'strict',
      });
  
      
  
        res.status(HTTP_STATUS_CODES.OK).json({
            user,
            accessToken
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            message: error instanceof Error ? error.message : MESSAGES.UNEXPECTED_ERROR,
        });
    }    
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const otp= req.body.otp;
      const email=req.body.email;
      await this._otpService.verifyOtp(email,otp);
      console.log("OTP verified");
      const user = await this._userService.getUserByEmail(email);
if (!user) {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: MESSAGES.USER_NOT_FOUND });
  return;
}
await this._userService.updateUser(user._id, { isVerified: true });
      res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGES.OTP_VERIFICATION_SUCCESS });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.OTP_VERIFICATION_FAILED });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }   

    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this._userService.getUserById(req.params.id);
      if (!user) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: MESSAGES.USER_NOT_FOUND });
      } else {
        res.json(user);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.UNEXPECTED_ERROR });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this._userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: MESSAGES.USER_NOT_FOUND });
      } else {
        res.json(user);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.USER_UPDATE_FAILED });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }
  
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this._userService.deleteUser(req.params.id);
      if (!user) {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: MESSAGES.USER_NOT_FOUND });
      } else {
        res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGES.USER_DELETED_SUCCESS });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.USER_DELETION_FAILED });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }

  async getPresignedUrl(req: Request, res: Response): Promise<void> {
    try {
      const url = await this._userService.getPresignedUrl(req.body.fileName, req.body.fileType);
      res.json({ url });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.UNEXPECTED_ERROR });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this._userService.listUsers();
      res.json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error in listUsers:", error);
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.UNEXPECTED_ERROR });
      } else {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.UNEXPECTED_ERROR });
      }
    }
  }
}

export const userController = new UserController(userService,otpService);
