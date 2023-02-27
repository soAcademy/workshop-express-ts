import { Router } from "express";
import { FileController } from "./controller";

const router = Router();
const controller = new FileController();

router.get("/files/:filename", controller.getById);

export { router as filesRouter };
