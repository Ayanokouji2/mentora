import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import {handleApiError} from './middleware/error.js'
import authRouter from './router/auth.router.js'
import { PORT } from "./constant/config.js";
import adminRouter from './router/admin.router.js'



const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.get("/",(req, res)=>{
    return res.status(200).json({
        message :"Welcome to Mentora🚀"
    });
})

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/admin",adminRouter)


app.use(handleApiError)
export default app;