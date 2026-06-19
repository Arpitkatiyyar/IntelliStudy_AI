-- DropForeignKey
ALTER TABLE `studysession` DROP FOREIGN KEY `StudySession_userId_fkey`;

-- AddForeignKey
ALTER TABLE `StudySession` ADD CONSTRAINT `StudySession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
