import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { genrateAccesstoken, genrateRefreshToken } from "../utils/jwt.js";
import redisClient from "../config/redis.js";
import { sendOTPEmail } from "../services/email.service.js";
import { json } from "zod";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp =Math.floor(100000+Math.random()*900000).toString();

    await redisClient.set(
      `otp:${email}`,JSON.stringify({
        name,
        email,
        password:hashedPassword,
        otp
      }),
      {EX:300}
    );

    await sendOTPEmail(email,otp);

    res.status(200).json({
      message:"otp sent successfully",
      email
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyOTP=async(req,res)=>{
  try {
    const { email, otp } = req.body;
    const otpData = await redisClient.get(`otp:${email}`);

    if (!otpData) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }
    const data = JSON.parse(otpData);
    if (data.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    await redisClient.del(`otp:${email}`);
    res.status(201).json({
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const refreshToken = genrateRefreshToken(user.id);
    const accessToken = genrateAccesstoken(user.id);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const refreshAcessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token missing",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(403).json({
        message: "Invalid Refresh Token.",
      });
    }

    const accessToken = genrateAccesstoken(user.id);
    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.decode(refreshToken);

      if (decoded?.userId) {
        await prisma.user.update({
          where: {
            id: decoded.userId,
          },
          data: {
            refreshToken: null,
          },
        });
      }
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};