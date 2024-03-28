import { Request, Response } from "express";
import rolerepository from "../repositories/role";

async function getRolesHandler(req: Request, res: Response) {
  try {
    const roles = await rolerepository.getAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getRoleByIdHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const role = await rolerepository.getById(params.id);
    if (role == null) {
      return res.status(404).json({ error: "record not found" });
    } else {
      return res.status(200).json(role);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

async function createRoleHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const role = await rolerepository.create(body);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateRoleHandler(req: Request, res: Response) {
  try {
    const { body, params } = req;
    const role = await rolerepository.update(params.id, body);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function destroyRoleHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const role = await rolerepository.destroy(params.id);
    res.status(204).json(role);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const rolehandler = {
  getRolesHandler,
  getRoleByIdHandler,
  createRoleHandler,
  updateRoleHandler,
  destroyRoleHandler,
};

export default rolehandler;
