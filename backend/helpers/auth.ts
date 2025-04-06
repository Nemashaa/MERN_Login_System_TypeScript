import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/user';

// Function to hash password
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Function to compare passwords
const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

// Function to generate access token
const generateAccessToken = (user: IUser): string => {
  const options: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn']) || '180s',
  };

  return jwt.sign(
    { _id: String(user._id), email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    options
  );
};

// Function to generate refresh token
const generateRefreshToken = (user: IUser): string => {
  const options: SignOptions = {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRY as SignOptions['expiresIn']) || '7d', // Use 7 days as default
  };

  return jwt.sign(
    { _id: String(user._id) },
    process.env.JWT_REFRESH_SECRET as string,
    options
  );
};

export { hashPassword, comparePassword, generateAccessToken, generateRefreshToken };
