import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({})

import { connectDb } from './utils/db.js';

import userRouter from './Routes/Userroute.js';
import companyRouter from './Routes/CompanyRoutes.js';
import jobRouter from './Routes/jobRoute.js';
import applicationRouter from './Routes/applicationRoute.js';
const app = express();

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const corsOptions = {
    origin: ["https://career-nest-steel.vercel.app", "http://localhost:5173"], // frontend domain
    credentials: true, // agar cookies ya auth headers bhejne hain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // all methods
};

app.use(cors(corsOptions));

//api
app.use('/api/v1/user', userRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)




//routes
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "this is job portal app",
        success: true
    })
})


const port = 5000
app.listen(port, () => {
    console.log(`server running at port ${port}`);
    connectDb();
})
