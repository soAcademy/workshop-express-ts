import express, { Router } from "express";
import MenusController from "./controller";

const router = Router();
const menusController = new MenusController();

router.get("/menus", menusController.get);
router.post("/menus", menusController.post);

export default router;
