-- AlterTable
ALTER TABLE `flashcard` ADD COLUMN `reviewedAt` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'new';
