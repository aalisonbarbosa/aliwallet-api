/*
  Warnings:

  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "type" "CategoryType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Category_userId_idx" ON "Category"("userId");
