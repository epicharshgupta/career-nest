import DataUriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    // if (!file || !file.originalname || !file.buffer) {
    //     throw new Error('Invalid file object. Ensure it has originalname and buffer properties.');
    // }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // Get the file extension
    const result = parser.format(extName, file.buffer); // Format the data URI

    if (!result) {
        throw new Error('Failed to generate data URI.');
    }

    return result;
};

export default getDataUri;
