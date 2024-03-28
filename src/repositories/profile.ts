import prisma from "../config/database";
import { Profile } from "../entities/profile";

async function getAll() {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
      addresses: true,
    },
  });
  return profiles;
}

async function getById(id: string) {
  const profile = await prisma.profile.findUnique({
    where: { id: id },
    include: {
      user: true,
      addresses: true,
    },
  });
  return profile;
}

async function create(payload: Profile) {
  const profile = await prisma.profile.create({
    data: {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
    },
    include: {
      user: true,
      addresses: true,
    },
  });
  return profile;
}

async function update(id: string, payload: Profile) {
  const profile = await prisma.profile.update({
    where: { id: id },
    data: {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
    },
    include: {
      user: true,
      addresses: true,
    },
  });
  return profile;
}

async function destroy(id: string) {
  const profile = await prisma.profile.delete({
    where: { id: id },
    include: {
      user: true,
      addresses: true,
    },
  });
  return profile;
}

const profilerepository = {
  getAll,
  getById,
  create,
  update,
  destroy,
};

export default profilerepository;
