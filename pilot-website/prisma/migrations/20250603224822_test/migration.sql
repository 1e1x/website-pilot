/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `milestones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_updates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `site_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `type` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provider` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_itemId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_itemId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "milestones" DROP CONSTRAINT "milestones_projectId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "project_media" DROP CONSTRAINT "project_media_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_members" DROP CONSTRAINT "project_members_userId_fkey";

-- DropForeignKey
ALTER TABLE "project_tags" DROP CONSTRAINT "project_tags_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_tags" DROP CONSTRAINT "project_tags_skillId_fkey";

-- DropForeignKey
ALTER TABLE "project_updates" DROP CONSTRAINT "project_updates_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "provider" SET NOT NULL,
ALTER COLUMN "providerAccountId" SET NOT NULL;

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "milestones";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "project_media";

-- DropTable
DROP TABLE "project_members";

-- DropTable
DROP TABLE "project_tags";

-- DropTable
DROP TABLE "project_updates";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "site_settings";

-- DropTable
DROP TABLE "skills";

-- DropTable
DROP TABLE "user_skills";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "CommentableType";

-- DropEnum
DROP TYPE "LikeableType";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "MemberStatus";

-- DropEnum
DROP TYPE "ProjectRole";

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "ProjectVisibility";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "roles" TEXT[],
    "skills" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
