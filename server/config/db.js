import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/food-menu"
const connectDB = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connectDB;