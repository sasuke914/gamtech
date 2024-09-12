/*
  Warnings:

  - You are about to alter the column `basePrice` on the `OrderProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `DoublePrecision`.
  - You are about to alter the column `basePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "OrderProduct" ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION;
