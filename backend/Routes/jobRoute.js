import express from 'express'
import authenticated from '../middlewares/Auth.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobController.js';


const jobRouter=express.Router();


jobRouter.post('/post',authenticated,postJob)
jobRouter.get('/get',authenticated,getAllJobs)
jobRouter.get('/get/:id',authenticated,getJobById);
jobRouter.get('/getadminjobs',authenticated,getAdminJobs);

export default jobRouter;