import prisma from '../config/prisma.js';
import axios from 'axios';

export const getWeakTopics=async(req,res)=>{
    try {
        const userId=req.user.userId;
        const session=await prisma.studySession.findMany({
            where:{userId},
            include:{
                flashcards:true,
            }
        })
        const weakTopics=[];
        session.forEach(session=>{
            const difficultCount=session.flashcards.filter(card=>card.status=="difficult").length;
            if(difficultCount>=2){
                weakTopics.push({
                    topic:session.topic,
                    difficultCount
                })
            }
        })
        weakTopics.sort((a, b) => b.difficultCount - a.difficultCount);
        res.status(200).json(weakTopics);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:error.message
        })
    }
}