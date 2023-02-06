import pool from "../../config/dbconnector";
import { Request, Response } from "express";
import MenuModel from "./model";

class MenusController {
  public async get(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM food_menus";
      const { rows } = await client.query(sql);
      const menus: MenuModel[] = rows;

      client.release();

      res.send(menus);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const menu = req.body as MenuModel;

      const client = await pool.connect();

      const sql = `
      INSERT INTO public.food_menus
      ("name", price, discount, categories_id)
      VALUES('${menu.name}', ${menu.price}, ${menu.discount}, ${menu.categories_id});
      `;
      await client.query(sql);

      client.release();
      res.status(201).send(menu);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default MenusController;
