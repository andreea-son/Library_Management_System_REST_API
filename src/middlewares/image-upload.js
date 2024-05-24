import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req, file, callback) {
        const fileName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, fileName);
    }
});

const upload = multer({ storage: storage });

export default upload;
