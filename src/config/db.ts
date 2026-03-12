import mongoose from "mongoose";
import logger from "../utils/logger"

const connectDb = async ():Promise<void>=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        logger.info(`MongoDb Connected :${conn.connection.host}`)
    }catch(error){
        logger.error(`MongoDb error:  ${(error as Error).message}`)
        process.exit(1);
    }
}
export default connectDb;