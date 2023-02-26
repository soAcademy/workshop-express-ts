import { Request, Response } from "express";
import { UserInfoModel } from "./model";
import { BaseReqParams, BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { UserInfo } from "../../entities";

const userInfoRepository = AppDataSource.getRepository(UserInfo);

class UserInfoController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    try {
      const datas = await userInfoRepository.find();

      return res.send(datas);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async getById(req: Request<BaseReqParams, {}, {}, {}>, res: Response) {
    const { id } = req.params;
    try {
      const datas = await userInfoRepository.findOneBy({ id: id });

      if (datas != null) {
        return res.send(datas);
      }
      return res
        .status(400)
        .send({ message: "cannot find your id in database" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async post(req: Request, res: Response) {
    try {
      const userinfoReq = req.body as UserInfoModel;

      const userinfo = new UserInfo();
      // courseEntity.name = course.name;
      // courseEntity.price = course.price;
      // courseEntity.startDate = course.start_date;
      // courseEntity.endDate = course.end_date;
      // courseEntity.studentMax = course.student_max;
      // courseEntity.categoriesId = course.categories_id;
      // courseEntity.teachersId = course.teachers_id;

      await userInfoRepository.save(userinfo);

      return res.status(201).send({ id: userinfo.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export { UserInfoController };
