import multer from "multer";
import { appConfig } from "./app-config";

const multerUpload = multer({ dest: appConfig.storagePath + `/uploads/` });

export { multerUpload };
