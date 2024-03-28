import { Request, Response } from "express";
import addressrepository from "../repositories/address";

async function getAddressesHandler(req: Request, res: Response) {
  try {
    const addresses = await addressrepository.getAll();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getAddressByIdHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const address = await addressrepository.getById(params.id);
    if (address == null) {
      res.status(404).json({ error: "record not found" });
    } else {
      res.status(200).json(address);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function createAddressHandler(req: Request, res: Response) {
  try {
    const { body } = req;
    const address = await addressrepository.create(body);
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

async function updateAddressHandler(req: Request, res: Response) {
  try {
    const { body, params } = req;
    const address = await addressrepository.update(params.id, body);
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteAddressHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    const address = await addressrepository.destroy(params.id);
    res.status(204).json(address);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const addresshandler = {
  getAddressesHandler,
  getAddressByIdHandler,
  createAddressHandler,
  updateAddressHandler,
  deleteAddressHandler,
};

export default addresshandler;
