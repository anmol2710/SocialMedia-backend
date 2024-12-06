import express from "express";
import postRoute from "./routes/postRoutes"
import userRoute from "./routes/userRoute"

const app = express();
app.use(express.json());

app.use("/post" , postRoute);
app.use("/user" , userRoute)

app.get("/" , (req:any,res:any)=>{
    return res.json({message:"Hello from the server"})
})

app.listen(5000 , ()=>{
    console.log("Server started")
})