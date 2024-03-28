import { Role } from "entities/role";
import jwt from "jsonwebtoken";

const generate = (user: any) => {
  const jwtSecret = process.env.SECRET_KEY;
  const expiresIn = process.env.EXPIRES_IN;

  return jwt.sign(
    {
      user: {
        id: user.id,
        roles: user.roles.map((role: Role) => ({ name: role.name })),
      },
    },
    jwtSecret!,
    { expiresIn: expiresIn }
  );
};

const tokens = {
  generate,
};

export default tokens;
