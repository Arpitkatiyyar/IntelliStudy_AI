-- DropForeignKey
ALTER TABLE `flashcard` DROP FOREIGN KEY `Flashcard_sessionId_fkey`;

-- AddForeignKey
ALTER TABLE `Flashcard` ADD CONSTRAINT `Flashcard_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `StudySession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
