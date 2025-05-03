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
      return;
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
    const safeUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      image: newUser.image,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    res.status(201).json(safeUser);
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

    console.log(user);
    if (!user) {
      res.status(401).json({ error: "사용자를 찾을 수 없습니다." });
      return;
    }

    console.log(process.env.JWT_SECRET_KEY!);

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user!.password
    );

    console.log("입력한 비밀번호:", req.body.password);
    console.log("DB의 해시된 비밀번호:", user!.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
      return;
    }

    const payload = {
      userId: user!.id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.json({ user: safeUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인에 실패했습니다." });
  }
});

router.get("/auth", async (req: Request, res: Response) => {
  try {
    console.log(req);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "인증에 실패했습니다." });
  }
});

export default router;
