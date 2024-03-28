import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user";
import { Role } from "../entities/role";

interface Decoded extends JwtPayload {
  user: {
    id: User["id"];
    roles: Role[];
  };
}

export const authorize = (roles: string[]) => {
  return (req: Request & { user?: Decoded }, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      if (!user?.user || !user.user.roles || user.user.roles.length === 0) {
        return res.status(403).json({ error: "insufficient permissions" });
      }
      const required = roles.some((role: string) => user.user.roles.some((user: Role) => user.name === role));
      if (!required) {
        return res.status(403).json({ error: "insufficient permissions" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  };
};
