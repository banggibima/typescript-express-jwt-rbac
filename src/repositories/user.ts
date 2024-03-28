import argon2 from "argon2";
import prisma from "../config/database";
import { User } from "../entities/user";

async function getAll() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      roles: true,
    },
  });
  return users;
}

async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      profile: true,
    },
  });
  return user;
}

async function getByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      profile: true,
      roles: true,
    },
  });
  return user;
}

async function create(payload: User) {
  payload.password = await argon2.hash(payload.password);

  const user = await prisma.user.create({
    data: {
      username: payload.username,
      password: payload.password,
      profile_id: payload.profile_id,
      roles: payload.roles?.length
        ? { connect: payload.roles.map((role) => ({ id: role.id })) }
        : undefined,
    },
    include: {
      profile: true,
      roles: true,
    },
  });
  return user;
}

async function update(id: string, payload: User) {
  if (payload.password) {
    payload.password = await argon2.hash(payload.password);
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      username: payload.username,
      password: payload.password,
      profile_id: payload.profile_id,
      roles: payload.roles?.length
        ? { connect: payload.roles.map((role) => ({ id: role.id })) }
        : undefined,
    },
    include: {
      profile: true,
      roles: true,
    },
  });
  return user;
}

async function destroy(id: string) {
  const user = await prisma.user.delete({
    where: { id: id },
    include: {
      profile: true,
      roles: true,
    },
  });
  return user;
}

const userrepository = {
  getAll,
  getById,
  getByUsername,
  create,
  update,
  destroy,
};

export default userrepository;
