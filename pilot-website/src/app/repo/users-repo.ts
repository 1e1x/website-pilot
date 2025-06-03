import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UsersRepo {
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true, accounts: true, sessions: true },
    });
  }
}

export default new UsersRepo();
