import express from 'express'
import authenticated from '../middlewares/Auth.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.js';

const applicationRouter=express.Router();


applicationRouter.get('/apply/:id',authenticated,applyJob)
applicationRouter.get('/get',authenticated,getAppliedJobs)
applicationRouter.get('/:id/applicants',authenticated,getApplicants);
applicationRouter.post('/status/:id/update',authenticated,updateStatus);

 
export default applicationRouter;