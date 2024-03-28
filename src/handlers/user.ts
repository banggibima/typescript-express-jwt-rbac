import argon2 from "argon2";
import { Request, Response } from "express";
import userrepository from "../repositories/user";
import tokens from "../utils/tokens";

async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await userrepository.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const user = await userrepository.getById(params.id);
    if (user == null) {
      res.status(404).json({ error: "record not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createUserHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await userrepository.create(body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateUserHandler(req: Request, res: Response) {
  try {
    const { body, params } = req;
    const user = await userrepository.update(params.id, body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function destroyUserHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const user = await userrepository.destroy(params.id);
    res.status(204).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function registerHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const exists = await userrepository.getByUsername(body.username);
    if (exists) {
      return res.status(400).json({ error: "username already exists" });
    }
    const user = await userrepository.create(body);
    const token = tokens.generate(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
}

async function loginHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await userrepository.getByUsername(body.username);
    if (user == null) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const valid = await argon2.verify(user.password, body.password);
    if (valid == false) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const token = tokens.generate(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
}

async function logoutHandler(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const userhandler = {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  destroyUserHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
};

export default userhandler;
