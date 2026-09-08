import "dotenv/config";
import dns from "node:dns";
import connectDb from "./db/index.js";
import app from "./app.js"

dns.setServers(["8.8.8.8", "1.1.1.1"]);

connectDb()
  .then(()=>{
    app.on("error",(error)=>{
        console.error("Error: ",error)
        throw error;
    })
    const PORT=process.env.PORT || 8000
    app.listen(PORT,()=>{
        console.log(`Server is running on Port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed: ", error);
  });

// import express from "express";
// const app=express();
// ;(async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("Error",error);
//         throw error
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`Server is running on port ${process.env.PORT}`)
//        })

//     }catch(error){
//         console.error("Error",error);
//         throw error;
//     }
// })()
