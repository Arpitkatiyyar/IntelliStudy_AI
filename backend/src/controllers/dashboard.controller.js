import prisma from "../config/prisma.js";

export const getDashboardStats = async (req, res) => {
  const userId = req.user.userId;

  const totalSession = await prisma.studySession.count({
    where: { userId },
  });

  const totalFlashcard = await prisma.flashcard.count({
    where: { session: { userId: userId } },
  });

  const totalQuizzes = await prisma.quiz.count({
    where: { session: { userId: userId } },
  });

  const knownCards = await prisma.flashcard.count({
    where:{session:{userId: userId},status:"known"}
  })

  const difficultCards=await prisma.flashcard.count({
    where:{session:{userId: userId},status:"difficult"}
  })

  const masteryPercentage=totalFlashcard===0?0:Math.round((knownCards/totalFlashcard)*100)

  res.status(200).json({
    totalSession,
    totalFlashcard,
    totalQuizzes,
    knownCards,
    difficultCards,
    masteryPercentage
  });
};


