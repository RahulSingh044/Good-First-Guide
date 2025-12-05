import mongoose from "mongoose";

export const connectDb = async () => {
    //if it is already connected
    if(mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await  mongoose.connect(process.env.MONGO_URI || "");
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error:", error);
    }
}