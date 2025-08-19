import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.APIKEY_SECRET
    });

export default cloudinary;