-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_sessionId_fkey`;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `StudySession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
