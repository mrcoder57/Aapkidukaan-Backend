/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `authorName` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "authorId" DROP DEFAULT,
ALTER COLUMN "authorName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_authorId_key" ON "Product"("authorId");
