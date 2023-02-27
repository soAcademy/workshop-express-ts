import { Request, Response } from "express";
import { UserInfoModel } from "./model";
import { BaseReqParams, BaseReqQuery } from "../../models";
import { AppDataSource } from "../../db";
import { FileEntity, UserInfo } from "../../entities";

const userInfoRepository = AppDataSource.getRepository(UserInfo);
const fileRepository = AppDataSource.getRepository(FileEntity);

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
      const data = await userInfoRepository.findOneBy({ id: id });

      if (data == null) {
        return res
          .status(400)
          .send({ message: "cannot find your id in database" });
      }

      const display = await fileRepository.findOneBy({ id: data.displayId });
      const response = {
        ...data,
        display: display,
      };

      delete response["displayId"];

      return res.send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async post(req: Request, res: Response) {
    if (req.file == null) {
      return res
        .status(500)
        .send({ message: "can't upload file to server please check" });
    }

    try {
      // Stamp file
      const fileEntity = new FileEntity();
      fileEntity.filename = req.file.filename;
      fileEntity.mimetype = req.file.mimetype;
      fileEntity.destination = req.file.destination;
      fileEntity.originalname = req.file.originalname;
      fileEntity.path = req.file.path;

      await fileRepository.save(fileEntity);

      // Create userinfo
      const userinfoReq = req.body as UserInfoModel;

      const userinfo = new UserInfo();
      userinfo.firstName = userinfoReq.firstName;
      userinfo.lastName = userinfoReq.lastName;
      userinfo.displayId = fileEntity.id;

      await userInfoRepository.save(userinfo);

      return res.status(201).send({ id: userinfo.id });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}

export { UserInfoController };
