import { Request, Response } from "express";
import { UserInfoModel } from "./model";
import { BaseReqParams, BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { UserInfo } from "../../entities";
import { FindManyOptions, Like } from "typeorm";

const userInfoRepository = AppDataSource.getRepository(UserInfo);

class CourseController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    try {
      // const { query } = req;
      // const limit = query.limit > 0 ? query.limit : 10;
      // const where: string = query.where;

      // let queryObj: FindManyOptions<UserInfo> = {
      //   take: limit,
      //   order: {
      //     id: query.sort === "desc" ? query.sort : "asc",
      //   },
      // };

      // if (where != null) {
      //   queryObj = {
      //     ...queryObj,
      //     where: {
      //       name: Like(`%${where}%`),
      //     },
      //   };
      // }
      // queryObj
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

export { CourseController };
