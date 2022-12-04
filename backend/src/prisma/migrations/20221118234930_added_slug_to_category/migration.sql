/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
