import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined): void => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(403).json({ success: false, message: 'Access token expired' });
          return;
        }
        res.status(403).json({ success: false, message: 'Invalid token' });
        return;
      }

      if (typeof decoded === 'string' || !decoded) {
        res.status(403).json({ success: false, message: 'Invalid token payload' });
        return;
      }

      req.user = decoded as JwtPayload & { _id: string };
      next();
    }
  );
};

export default authMiddleware;
