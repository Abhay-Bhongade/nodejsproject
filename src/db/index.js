import mongoose from "mongoose";
import {DBNAME} from "../constants.js"

const connectDB = async ()=>{
    try {
        console.log("MongoDB URI:", process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
          
          console.log("Database Connected Successfully", connectionInstance.connection.host);
        } catch (error) {
        console.log("Error While Connecting Database:",error)
        process.exit(1)
    }
}

export default connectDB;