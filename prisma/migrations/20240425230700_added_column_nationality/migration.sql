/*
  Warnings:

  - Added the required column `nationality` to the `author` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `publisher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `publisher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `author` ADD COLUMN `nationality` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `publisher` MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL;
