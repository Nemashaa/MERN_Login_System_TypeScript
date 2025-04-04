import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    console.warn('Unauthorized: No token provided');
    res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined): void => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          console.warn('Access token expired');
          res.status(403).json({ success: false, message: 'Access token expired' });
          return;
        }
        console.warn('Invalid token:', err.message);
        res.status(403).json({ success: false, message: 'Invalid token' });
        return;
      }

      if (typeof decoded === 'string' || !decoded) {
        console.warn('Invalid token payload');
        res.status(403).json({ success: false, message: 'Invalid token payload' });
        return;
      }

      console.log('Token verified for user:', decoded);
      req.user = decoded as JwtPayload & { _id: string };
      next();
    }
  );
};

export default authMiddleware;
