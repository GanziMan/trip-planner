import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string; // 실제 payload의 키와 타입에 맞게 조정
}

let auth = async (req: any, res: any, next: any) => {
  const prisma = new PrismaClient();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "토큰이 없습니다." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as DecodedToken;
    const user = await prisma.user.findUnique({
      where: { email: decoded.userId },
    });
    if (!user) {
      return res.status(403).json({ error: "사용자를 찾을 수 없습니다." });
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
    return res.status(403).json({ error: "토큰이 유효하지 않습니다." });
  }
};

module.exports = auth;
