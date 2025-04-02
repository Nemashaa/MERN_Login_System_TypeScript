import express, { Router } from 'express';
import cors from 'cors';
import { 
  test, 
  registerUser, 
  loginUser, 
  refreshAccessToken, 
  logoutUser, 
  getProfile 
} from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.post('/refresh-token', refreshAccessToken); // Keep only one refresh token route
router.post('/logout', logoutUser); // Logout route already implemented here

export default router;
