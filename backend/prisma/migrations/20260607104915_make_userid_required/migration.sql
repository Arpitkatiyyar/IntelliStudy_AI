/*
  Warnings:

  - Made the column `userId` on table `studysession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `studysession` DROP FOREIGN KEY `StudySession_userId_fkey`;

-- AlterTable
ALTER TABLE `studysession` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `StudySession` ADD CONSTRAINT `StudySession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
