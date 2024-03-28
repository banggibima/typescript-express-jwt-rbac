import { Request, Response } from "express";
import profilerepository from "../repositories/profile";

async function getProfilesHandler(req: Request, res: Response) {
  try {
    const profiles = await profilerepository.getAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getProfileByIdHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const profile = await profilerepository.getById(params.id);
    if (profile == null) {
      res.status(404).json({ error: "record not found" });
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createProfileHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const profile = await profilerepository.create(body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateProfileHandler(req: Request, res: Response) {
  try {
    const { body, params } = req;
    const profile = await profilerepository.update(params.id, body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function destroyProfileHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const profile = await profilerepository.destroy(params.id);
    res.status(204).json(profile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const profilehandler = {
  getProfilesHandler,
  getProfileByIdHandler,
  createProfileHandler,
  updateProfileHandler,
  destroyProfileHandler,
};

export default profilehandler;
