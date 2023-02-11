import { Request, Response } from "express";
import { MenuModel } from "./model";
import { BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { FoodMenus } from "../../entities";

const menuRepository = AppDataSource.getRepository(FoodMenus);

class MenusController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    try {
      const { query } = req;
      const limit = query.limit > 0 ? query.limit : 10;

      const menus = await menuRepository.find({ take: limit });

      res.send(menus);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const menu = req.body as MenuModel;

      const foodMenu = new FoodMenus();
      foodMenu.name = menu.name;
      foodMenu.price = menu.price;
      foodMenu.discount = menu.discount;
      foodMenu.categoriesId = menu.categories_id;

      await menuRepository.save(foodMenu);

      res.status(201).send({ id: foodMenu.id });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export { MenusController };
