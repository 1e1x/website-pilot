"use server";

import usersRepo from "../repo/users-repo";
import type { UserUpdateData } from "~/types/prisma";

export async function getUserByIdAction(id : string) {
  return await usersRepo.getUserById(id);
}

export async function updateUserInfoAction(id : string, updatedInfo : UserUpdateData) {
  return await usersRepo.updateUserInfo(id, updatedInfo);
}



