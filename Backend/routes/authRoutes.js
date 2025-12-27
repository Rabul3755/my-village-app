import express from "express"
import {  register,
  login,
  getMe,
  updateProfile,} from "../controllers/authController.js"
import { protect } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', protect, getMe);
authRouter.put('/profile', protect, updateProfile);
export default authRouter