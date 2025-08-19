import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController.js';
import authenticated from '../middlewares/Auth.js';
import { singleUpload } from '../middlewares/multer.js';

const companyRouter=express.Router();


companyRouter.post('/register',authenticated,registerCompany)
companyRouter.get('/get',authenticated,getCompany)
companyRouter.get('/get/:id',authenticated,getCompanyById);
companyRouter.post('/update/:id',authenticated,singleUpload,updateCompany);
 
export default companyRouter;