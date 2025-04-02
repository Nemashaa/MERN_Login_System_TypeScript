import express from 'express';

const router = express.Router();

router.post('/logout', (req, res) => {
  try {
    res.cookie('accessToken', '', { httpOnly: true, sameSite: 'strict', maxAge: 0 });
    res.cookie('refreshToken', '', { httpOnly: true, sameSite: 'strict', maxAge: 0 });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: 'Failed to log out' });
  }
});

export default router;
