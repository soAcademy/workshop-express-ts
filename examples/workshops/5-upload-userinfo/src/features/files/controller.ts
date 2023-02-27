import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { FileEntity } from "../../entities";
import { extension } from "mime-types";
import { appConfig } from "../../config";

type ReqParam = { filename: string };

const fileRepository = AppDataSource.getRepository(FileEntity);

class FileController {
  public async getById(req: Request<ReqParam, {}, {}, {}>, res: Response) {
    const filename = req.params.filename;

    const file = await fileRepository.findOneBy({ filename: filename });
    const ex = extension(file.mimetype);

    res.set(
      "Content-Disposition",
      `attachment; filename="${file.filename}.${ex}"`
    );
    return res.sendFile(appConfig.storagePath + `/uploads/${file.filename}`);
  }
}

export { FileController };
