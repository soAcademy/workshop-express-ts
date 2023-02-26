import multer from "multer";

const multerUpload = multer({ dest: __dirname + `/uploads/` });

export { multerUpload };
