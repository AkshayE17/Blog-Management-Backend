import Otp, { IOtp } from "../models/otp";
import { IOtpRepository } from "../interfaces/otp/IOtpRepository";

class OtpRepository implements IOtpRepository {
  // Create OTP entry for a given email and OTP value
  async createOtp(email: string, otp: number): Promise<IOtp> {
    try {
      const otpEntry = new Otp({ email, otp });
      return await otpEntry.save();
    } catch (error) {
      console.error(`Error creating OTP for email: ${email}`, error);
      throw new Error("Error creating OTP");
    }
  }      
           
  // Find OTP entry for a given email and OTP value
  async findOtp(email: string): Promise<IOtp | null> {
    try {
      console.log("email", email);
      const otp = await Otp.findOne({ email:email });
      if (!otp) {
        console.log(`No OTP found for email: ${email}`);
        return null;
      }
      console.log("otp", otp);
      return otp;
    } catch (error) {
      console.error(`Error finding OTP for email: ${email}`, error);
      throw new Error("Error finding OTP");
    }
  }
  
  // Delete OTP entry for a given email
  async deleteOtp(email: string): Promise<void> {
    try {
      await Otp.deleteOne({ email });
    } catch (error) {
      console.error(`Error deleting OTP for email: ${email}`, error);
      throw new Error("Error deleting OTP");
    }
  }
}


export const otpRepository = new OtpRepository();
     