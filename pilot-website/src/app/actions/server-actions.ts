"use server";

import usersRepo from "../repo/users-repo";

export async function getUserByIdAction(id : string) {
  return await usersRepo.getUserById(id);
}
