import mongoose from "mongoose"

async function mongoConnect(url) {
    
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}


export default mongoConnect;