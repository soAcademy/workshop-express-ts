import { Request, Response } from "express";
import { CourseModel } from "./model";
import { BaseReqParams, BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { Courses } from "../../entities";

const courseRepository = AppDataSource.getRepository(Courses);

class CourseController {
  public async get(req: Request<{}, {}, {}, BaseReqQuery>, res: Response) {
    try {
      const { query } = req;
      const limit = query.limit > 0 ? query.limit : 10;

      const courseEntities = await courseRepository.find({ take: limit });

      res.send(courseEntities);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async getById(req: Request<BaseReqParams, {}, {}, {}>, res: Response) {
    const { id } = req.params;

    const courseEntity = await courseRepository.findOneBy({ id: id });

    if (courseEntity != null) {
      res.send(courseEntity);
      return;
    }
    res.status(400).send({ message: "cannot find your id in database" });
    return;
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

      res.status(201).send({ id: courseEntity.id });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export { CourseController };
