import { PrismaClient} from "@prisma/client";
import { Prisma} from "@prisma/client";

import type { UserUpdateData } from "~/types/prisma";

const prisma = new PrismaClient();

class UsersRepo {
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true, accounts: true, sessions: true, userSkills: {include : {skill : true} }, ownedProjects: true, projectMemberships: true },
    });
  }


async updateUserInfo(id: string, updatedInfo: UserUpdateData) {
  return await prisma.user.update({
    where: { id },
    data: updatedInfo,
    include: {
      posts: true,
      accounts: true,
      sessions: true,
      userSkills: { include: { skill: true } },
      ownedProjects: true,
      projectMemberships: true,
     },
    });
  }
}


export default new UsersRepo();


