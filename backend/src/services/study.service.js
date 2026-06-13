import prisma from "../config/prisma.js";
export const saveStudySession=async(data)=>{
    const session =await prisma.StudySession.create({
        data:{
            userId:data.userId,
            topic:data.topic,
            summary:data.summary,
            flashcards:{
                create:data.flashcards
            },
            quizzes:{
                create:data.quiz.map((q)=>({
                    question:q.question,
                    options:q.options,
                    correctAnswer:q.correctAnswer,
                    difficulty:q.difficulty
                }))
            }
        },
        include:{
            flashcards:true,
            quizzes:true
        },
    });
    return session;
}
