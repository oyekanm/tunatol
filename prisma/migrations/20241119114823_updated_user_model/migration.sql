/*
  Warnings:

  - You are about to alter the column `totalCost` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `discount_percent` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "discount_percent" SET DATA TYPE INTEGER;
