/*
  Warnings:

  - You are about to drop the `blacklistedtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `profile_image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `blacklistedtoken`;

-- CreateTable
CREATE TABLE `blacklisted_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(2048) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blacklisted_token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
