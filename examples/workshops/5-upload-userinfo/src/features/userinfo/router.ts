import { Router } from "express";
import { UserInfoController } from "./controller";

const router = Router();
const controller = new UserInfoController();

router.get("/userinfos", controller.get);
router.get("/userinfos/:id", controller.getById);
router.post("/userinfos", controller.post);

export { router as userinfosRouter };
