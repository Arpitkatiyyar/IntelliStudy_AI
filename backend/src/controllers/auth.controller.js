import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js"


export const registerUser=async(req,res)=>{
    try{
        const { name, email,password}=req.body
        const existingUser=await prisma.user.findUnique({
            where:{email}
        })
        if(existingUser){
            return res.status(400).json({
                message:"user already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const user= await prisma.user.create({
            data:{name,
            email,
            password:hashedPassword}
        })
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(201).json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
            message:"user registered"
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }

        const isMatch =await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }   
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            message:"Login successful"
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }    
}
