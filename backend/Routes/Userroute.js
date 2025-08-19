import express from 'express'
import { login, logOut, register, updateProfile } from '../controllers/User.js';
import authenticated from '../middlewares/Auth.js';
import {  singleUpload } from '../middlewares/multer.js';

const userRouter=express.Router();


userRouter.post('/register',singleUpload,register)
userRouter.post('/login',login)
userRouter.get('/logout',logOut)
userRouter.post('/profile/update',authenticated,singleUpload,updateProfile);

export default userRouter;