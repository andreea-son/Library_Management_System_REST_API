/*
  Warnings:

  - You are about to drop the column `address` on the `publisher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `publisher` DROP COLUMN `address`,
    ADD COLUMN `city` VARCHAR(191) NULL;
