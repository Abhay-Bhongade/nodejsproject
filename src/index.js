import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js"

dotenv.config({ path: "./.env" });

connectDB().then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`App is listening at http://localhost:${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("Error While Connecting to Database");
})
