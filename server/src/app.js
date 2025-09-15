import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req, res)=>{
    return res.status(200).json({
        message :"Welcome to Mentora🚀"
    });
})

export default app;