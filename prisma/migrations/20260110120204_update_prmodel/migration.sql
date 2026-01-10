/*
  Warnings:

  - The `filesChanged` column on the `GitDiff` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[gitDiffId]` on the table `PR` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "contributionStatus" AS ENUM ('PENDING', 'PROGRESS', 'COMPLETED');

-- AlterEnum
ALTER TYPE "STATUS" ADD VALUE 'STARTED';

-- DropIndex
DROP INDEX "PR_gitDiffId_idx";

-- AlterTable
ALTER TABLE "GitDiff" DROP COLUMN "filesChanged",
ADD COLUMN     "filesChanged" TEXT[];

-- CreateTable
CREATE TABLE "contribution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "prId" TEXT,
    "status" "contributionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "contribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contribution_userId_idx" ON "contribution"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PR_gitDiffId_key" ON "PR"("gitDiffId");

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_prId_fkey" FOREIGN KEY ("prId") REFERENCES "PR"("id") ON DELETE SET NULL ON UPDATE CASCADE;
