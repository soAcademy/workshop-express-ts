import { Request, Response } from "express";
import { CourseModel } from "./model";
import { BaseReqParams, BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { Courses } from "../../entities";
import { FindManyOptions, Like } from "typeorm";

const courseRepository = AppDataSource.getRepository(Courses);

class CourseController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    try {
      const { query } = req;
      const limit = query.limit > 0 ? query.limit : 10;
      const where: string = query.where;

      let queryObj: FindManyOptions<Courses> = {
        take: limit,
        order: {
          id: query.sort === "desc" ? query.sort : "asc",
        },
      };

      if (where != null) {
        queryObj = {
          ...queryObj,
          where: {
            name: Like(`%${where}%`),
          },
        };
      }

      const courseEntities = await courseRepository.find(queryObj);

      return res.send(courseEntities);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async getById(req: Request<BaseReqParams, {}, {}, {}>, res: Response) {
    const { id } = req.params;
    try {
      const courseEntity = await courseRepository.findOneBy({ id: id });

      if (courseEntity != null) {
        return res.send(courseEntity);
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
      const course = req.body as CourseModel;

      const courseEntity = new Courses();
      courseEntity.name = course.name;
      courseEntity.price = course.price;
      courseEntity.startDate = course.start_date;
      courseEntity.endDate = course.end_date;
      courseEntity.studentMax = course.student_max;
      courseEntity.categoriesId = course.categories_id;
      courseEntity.teachersId = course.teachers_id;

      await courseRepository.save(courseEntity);

      return res.status(201).send({ id: courseEntity.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export { CourseController };
