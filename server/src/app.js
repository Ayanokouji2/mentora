import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import {handleApiError} from './middleware/error.js'
import authRouter from './router/auth.routes.js'
import adminRouter from './router/admin.routes.js'
import attendanceRouter from "./router/attendance.routes.js";
import studentRouter from "./router/student.routes.js";



const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5000",
    credentials :true
}));
app.use(cookieParser())


app.get("/",(req, res)=>{
    return res.status(200).json({
        message :"Welcome to Mentora🚀"
    });
})

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/student",studentRouter)
app.use("/api/v1/attendance",attendanceRouter)


app.use(handleApiError)
export default app;