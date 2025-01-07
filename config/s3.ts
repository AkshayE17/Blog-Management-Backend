import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,   
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generatePresignedUrl = async (fileName: string, fileType: string): Promise<string> => {
  try {
   
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    // Setting up parameters for the S3 PutObjectCommand
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: sanitizedFileName,
      ContentType: fileType,
    };

    // Create a command for the PutObject operation
    const command = new PutObjectCommand(params);

    // Generate a presigned URL
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};
