import express from 'express';
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();


mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB!!!!!!!!!!!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const app = express()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})