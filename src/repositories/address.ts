import prisma from "../config/database";
import { Address } from "../entities/address";

async function getAll() {
  const addresses = await prisma.address.findMany({
    include: {
      profile: true,
    },
  });
  return addresses;
}

async function getById(id: string) {
  const address = await prisma.address.findUnique({
    where: { id: id },
    include: {
      profile: true,
    },
  });
  return address;
}

async function create(payload: Address) {
  const address = await prisma.address.create({
    data: {
      street: payload.street,
      city: payload.city,
      zip: payload.zip,
      profile_id: payload.profile_id,
    },
    include: {
      profile: true,
    },
  });
  return address;
}

async function update(id: string, payload: Address) {
  const address = await prisma.address.update({
    where: { id: id },
    data: {
      street: payload.street,
      city: payload.city,
      zip: payload.zip,
      profile_id: payload.profile_id,
    },
    include: {
      profile: true,
    },
  });
  return address;
}

async function destroy(id: string) {
  const address = await prisma.address.delete({
    where: { id: id },
    include: {
      profile: true,
    },
  });
  return address;
}

const addressrepository = {
  getAll,
  getById,
  create,
  update,
  destroy,
};

export default addressrepository;
