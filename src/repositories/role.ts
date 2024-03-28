import prisma from "../config/database";
import { Role } from "../entities/role";

async function getAll() {
  const roles = await prisma.role.findMany({
    include: {
      users: true,
    },
  });
  return roles;
}

async function getById(id: string) {
  const role = await prisma.role.findUnique({
    where: { id: id },
    include: {
      users: true,
    },
  });
  return role;
}

export async function create(payload: Role) {
  const role = await prisma.role.create({
    data: {
      name: payload.name,
    },
    include: {
      users: true,
    },
  });
  return role;
}

export async function update(id: string, payload: Role) {
  const role = await prisma.role.update({
    where: { id: id },
    data: {
      name: payload.name,
    },
    include: {
      users: true,
    },
  });
  return role;
}

async function destroy(id: string) {
  const role = await prisma.role.delete({
    where: { id: id },
    include: {
      users: true,
    },
  });
  return role;
}

const rolerepository = {
  getAll,
  getById,
  create,
  update,
  destroy,
};

export default rolerepository;
