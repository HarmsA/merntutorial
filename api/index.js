import express from 'express';
import mongoose from 'mongoose'
import useRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
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
app.use(express.json())

app.listen(3000, () => {
    console.log("server is running on port 3000")
})


app.use('/api/user', useRouter)
app.use("/api/auth", authRouter);

// middlewear for request
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})