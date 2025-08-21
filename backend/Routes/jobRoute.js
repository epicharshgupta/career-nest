import express from 'express'
import authenticated from '../middlewares/Auth.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';


const jobRouter=express.Router();


jobRouter.post('/post',authenticated,postJob)
// Public endpoints for job listing
jobRouter.get('/get',getAllJobs)
jobRouter.get('/get/:id',getJobById);
// Admin endpoints that require authentication
jobRouter.get('/getadminjobs',authenticated,getAdminJobs);

export default jobRouter;