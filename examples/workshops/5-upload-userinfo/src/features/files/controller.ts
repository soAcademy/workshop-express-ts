import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { FileEntity } from "../../entities";
import { appConfig } from "../../config";

type ReqParam = { filename: string };

const fileRepository = AppDataSource.getRepository(FileEntity);

class FileController {
  public async getById(req: Request<ReqParam, {}, {}, {}>, res: Response) {
    const filename = req.params.filename;
    const file = await fileRepository.findOneBy({ filename: filename });

    res.set(
      "Content-Disposition",
      `attachment; filename="${file.originalname}"`
    );
    return res.sendFile(appConfig.storagePath + `/uploads/${file.filename}`);
  }
}

export { FileController };
