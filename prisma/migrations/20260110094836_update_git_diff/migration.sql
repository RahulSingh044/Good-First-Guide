/*
  Warnings:

  - You are about to drop the `gitDiff` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gitDiffId` to the `PR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PR` table without a default value. This is not possible if the table is not empty.
  - Made the column `prdata` on table `PR` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PR" DROP CONSTRAINT "PR_issueId_fkey";

-- DropForeignKey
ALTER TABLE "PR" DROP CONSTRAINT "PR_userId_fkey";

-- DropForeignKey
ALTER TABLE "gitDiff" DROP CONSTRAINT "gitDiff_useId_fkey";

-- AlterTable
ALTER TABLE "PR" ADD COLUMN     "gitDiffId" TEXT NOT NULL,
ADD COLUMN     "status" "STATUS" NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "prdata" SET NOT NULL,
ALTER COLUMN "prdata" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "gitDiff";

-- CreateTable
CREATE TABLE "GitDiff" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "repoOwner" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "diff" TEXT NOT NULL,
    "filesChanged" INTEGER,
    "insertions" INTEGER,
    "deletions" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GitDiff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GitDiff_issueId_idx" ON "GitDiff"("issueId");

-- CreateIndex
CREATE INDEX "GitDiff_repoOwner_repoName_idx" ON "GitDiff"("repoOwner", "repoName");

-- CreateIndex
CREATE INDEX "PR_issueId_idx" ON "PR"("issueId");

-- CreateIndex
CREATE INDEX "PR_gitDiffId_idx" ON "PR"("gitDiffId");

-- AddForeignKey
ALTER TABLE "PR" ADD CONSTRAINT "PR_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR" ADD CONSTRAINT "PR_gitDiffId_fkey" FOREIGN KEY ("gitDiffId") REFERENCES "GitDiff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR" ADD CONSTRAINT "PR_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitDiff" ADD CONSTRAINT "GitDiff_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
