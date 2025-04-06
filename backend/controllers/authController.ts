import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../types/requestTypes"; // Use the imported type
import User, { IUser } from '../models/user';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from '../helpers/auth';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import logger from '../utils/logger'; 
import asyncHandler from 'express-async-handler';

// Test Endpoint
const test = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  logger.info('Test endpoint accessed');
  res.json('Test is working');
});

// Register Endpoint
const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name) {
    logger.warn('Registration failed: Name is required');
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  if (!password || password.length < 6) {
    logger.warn('Registration failed: Weak password');
    res.status(400).json({ error: 'Password should be at least 6 characters long' });
    return;
  }

  const exist = await User.findOne({ email });
  if (exist) {
    logger.warn(`Registration failed: Email ${email} already taken`);
    res.status(400).json({ error: 'Email is already taken' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  logger.info(`New user registered: ${email}`);
  res.status(201).json(user);
});

// Login Endpoint
const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: 'No user found' });
    return;
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    res.status(400).json({ error: 'Incorrect password' });
    return;
  }

  const accessToken = generateAccessToken(user as IUser);
  const refreshToken = generateRefreshToken(user as IUser);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ user });
});

// Refresh Token Endpoint
const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken; // Ensure the refreshToken is retrieved from cookies
  if (!refreshToken) {
    res.status(403).json({ error: 'Refresh token not found' }); // Return 403 if the token is missing
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        res.status(403).json({ error: 'Invalid refresh token' }); // Return 403 if the token is invalid
        return;
      }

      const newAccessToken = generateAccessToken(decoded as IUser); // Generate a new access token
      res.json({ accessToken: newAccessToken }); // Send the new access token to the client
    }
  );
});

// Logout Endpoint
const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
  res.clearCookie('accessToken', { httpOnly: true, sameSite: 'strict' });

  res.json({ success: true, message: 'Logged out successfully' });
});

// Get Profile Endpoint
const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        if (err?.name === 'TokenExpiredError') {
          logger.warn('Profile access failed: Access token expired');
          res.status(403).json({ success: false, message: 'Access token expired' });
          return;
        }
        logger.warn('Profile access failed: Invalid access token');
        res.status(403).json({ success: false, message: 'Invalid token' });
        return;
      }

      logger.info(`Profile accessed for user ID: ${(decoded as JwtPayload)._id}`);
      res.json(decoded);
    }
  );
});

export {
  test,
  registerUser,
  loginUser,
  getProfile,
  refreshAccessToken,
  logoutUser,
};