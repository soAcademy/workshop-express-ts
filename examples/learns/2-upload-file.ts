import express, { Request, Response } from "express";
import multer from "multer";

const upload = multer({ dest: __dirname + `/uploads/` });

const app = express();

type ReqParam = { fileName: string };

app.get("/:fileName", function (req: Request<ReqParam, {}, {}, {}>, res) {
  const fileName = req.params.fileName;

  res.set("Content-Disposition", `attachment; filename="${fileName}.txt"`);
  res.sendFile(__dirname + `/uploads/${fileName}`);
});

app.post("/upload", upload.single("file"), (req: any, res) => {
  return res.send(req.file);
});

app.listen(5000);
