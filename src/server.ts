import * as express from "express";
import { Express, Request, Response } from "express";
import * as bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/menus", (_, res: Response) => {
  const mockResponseBody = [
    {
      id: 1,
      name: "ผัดกระเพราไก่",
      price: 50,
      current_price: 40,
      category_name: "ผัด",
    },
    {
      id: 2,
      name: "ผัดกระเพราเนื้อ",
      price: 50,
      current_price: 40,
      category_name: "ผัด",
    },
    {
      id: 3,
      name: "ผัดกระเพราหมู",
      price: 50,
      current_price: 35,
      category_name: "ผัด",
    },
  ];

  res.send(mockResponseBody);
});

app.post("/menus", (req: Request, res: Response) => {
  // save to database here.

  res.send(req.body);
});

const port = 5000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
