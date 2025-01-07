import { IOtp } from "../../models/otp";

export interface IOtpRepository {
  createOtp(email: string, otp: number): Promise<IOtp>;
  findOtp(email: string): Promise<IOtp | null>;
  deleteOtp(email: string): Promise<void>;
}
