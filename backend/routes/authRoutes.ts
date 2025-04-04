import express, { Router } from 'express';
import cors from 'cors';
import corsOptions from '../config/corsConfig'; // Import CORS options
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

// Apply CORS middleware to specific routes if needed
router.use(cors(corsOptions));

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);

export default router;
