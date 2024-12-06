import { Router } from "express";
import prisma from "../utils/prismaProvider";
import bcrypt from 'bcrypt';

const router = Router();

router.post("/signup" , async (req,res:any)=>{
    const {name , username , email , password} = req.body;

    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[
                {email},
                {username}
            ]
        }
    })
    
    if(existingUser){
        return res.status(401).json({error:"Email or Username already taken"})
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await prisma.user.create({
        data:{name , email , username , password:hashedPassword}
    })
})

router.post("/signin" , async (req,res:any)=>{
    const {email , password} = req.body;

    const user = await prisma.user.findFirst({
        where:{email}
    })
    if(user){

        const isMatch = await bcrypt.compare(password , user.password);
        
        if(isMatch){
            return res.status(201).json({user});
        }
        else{
            return res.status(400).json({error:"Invalid credentials"})
        }
    }
    return res.status(400).json({error:"User not found"})

})

export default router;