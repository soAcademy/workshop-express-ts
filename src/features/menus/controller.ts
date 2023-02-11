import { dbconnectorPool } from "../../db";
import { Request, Response } from "express";
import { MenuModel } from "./model";
import { BaseReqQuery } from "../../models";

class MenusController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    const client = await dbconnectorPool.connect();
    try {
      const { query } = req;

      query.limit = query.limit > 0 ? query.limit : 10;

      const sql = `SELECT * FROM food_menus
                      limit ${query.limit}`;
      const { rows } = await client.query(sql);
      const menus: MenuModel[] = rows;

      res.send(menus);
    } catch (error) {
      res.status(400).send(error);
    } finally {
      client.release();
    }
  }

  public async post(req: Request, res: Response) {
    const client = await dbconnectorPool.connect();
    try {
      const menu = req.body as MenuModel;

      const sql = `
          INSERT INTO public.food_menus
          ("name", price, discount, categories_id)
          VALUES('${menu.name}', ${menu.price}, ${menu.discount}, ${menu.categories_id});
          `;
      await client.query(sql);

      res.status(201).send();
    } catch (error) {
      res.status(400).send(error);
    } finally {
      client.release();
    }
  }
}

export { MenusController };
