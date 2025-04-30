import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ error: "이미 존재하는 사용자입니다." });
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 0,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "회원가입에 실패했습니다." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).json({ error: "사용자를 찾을 수 없습니다." });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user!.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    const payload = {
      userID: user!.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({
      user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인에 실패했습니다." });
  }
});

export default router;
