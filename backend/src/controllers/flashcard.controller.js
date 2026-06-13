import prisma from "../config/prisma.js";

export const updateFlashcardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCard =
      await prisma.flashcard.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
          reviewedAt: new Date(),
        },
      });

    res.status(200).json(updatedCard);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};