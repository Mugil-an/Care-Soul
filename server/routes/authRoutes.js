import express from "express";

import {login,logout,signup,verifyOtp} from '../controllers/authController.js'

const router = express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/verify-otp',verifyOtp)

export default router;

