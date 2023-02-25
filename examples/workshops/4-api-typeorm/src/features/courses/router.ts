import { Router } from "express";
import { CourseController } from "./controller";

const router = Router();
const controller = new CourseController();

router.get("/courses", controller.get);
router.post("/courses", controller.post);

export { router as coursesRouter };
