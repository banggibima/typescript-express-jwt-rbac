import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user";

dotenv.config();

const jwtSecret = process.env.SECRET_KEY;

interface Decoded extends JwtPayload {
  user: {
    id: User["id"];
    roles: string[];
  };
}

export const authenticate = (req: Request & { user?: Decoded }, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "unauthorized" });
    }
    jwt.verify(token, jwtSecret!, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "forbidden" });
      }
      if (!decoded) {
        return res.status(403).json({ error: "invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
