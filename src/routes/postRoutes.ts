import { Router } from "express";
import app from "../utils/Firebase";
import { getStorage,  ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import prisma from "../utils/prismaProvider";

const router = Router();

router.post("/new" ,async (req:Request,res:any)=>{

    const body = await req.formData();

    const description = body.get("description") as string
    const postImage = body.get("postImage") as File

    if(description){
        const date = Date.now();
        
        const storage = getStorage(app);
        const storageRef = ref(storage , `postImage/userId/${date}`);
        
        await uploadBytes(storageRef , postImage);
        
        const imageUrl = await getDownloadURL(ref(storage , `postImage/userId/${date}`));
        
        const post = await prisma.post.create({data:{
            imageUrl , description , userId:1
        }})
        
        return res.status(200).json({post:post})
    }
    else{
        return res.status(401).json({error:"Invalid request"})
    }
})

export default router