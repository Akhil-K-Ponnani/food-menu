import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import foodRoutes from "./routes/food.js";

/* App Config */
const app = express();
const port = 5000;

/* Middlewares */
app.use(express.json())
app.use("/user", userRoutes);
app.use("/food", foodRoutes);

/* DB Connect */
connectDB.then((data) => console.log(`Database Connected: ${data.connection.host}`)).catch((err) => console.log(err));

/* Listener */
app.listen(port, () => console.log(`Server started at ${port}`));