import { Router } from "express";
import { MenusController } from "./controller";

const menusRouter = Router();
const menusController = new MenusController();

menusRouter.get("/menus", menusController.get);
menusRouter.post("/menus", menusController.post);

export { menusRouter };
