import type { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  include: {
    userSkills: { include: { skill: true } };
    posts: true;
    accounts: true;
    sessions: true;
    ownedProjects: true;
    projectMemberships: true;
  };
}>;


export type UserUpdateData = Partial<Pick<
  User,
  | 'name'
  | 'email'
  | 'bio'
  | 'location'
  | 'website'
  | 'twitter'
  | 'linkedin'
  | 'github'
>>;