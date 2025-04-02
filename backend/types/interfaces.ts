
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

// User Interface
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

// Authenticated Request Interface
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

// Token Payload Interface
export interface UserPayload {
  _id: string;
  email: string;
  name: string;
}