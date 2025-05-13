import express from 'express';
import {
  registerUser,
  loginUser,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete("/favorites/:cca3", protect, removeFavorite);

export default router;
