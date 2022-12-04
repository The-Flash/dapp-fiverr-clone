-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('seller', 'buyer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mode" "Mode" NOT NULL DEFAULT 'buyer',
ADD COLUMN     "profilePhoto" TEXT;
