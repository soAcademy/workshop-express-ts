import express, { Express, Request, Response } from "express";
const app = express();

type ReqQuery = { limit?: number };

app.get("/menus", (req: express.Request<{}, {}, {}, ReqQuery>, res) => {
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

  const limit = req.query.limit;

  if (limit) {
    return res.send(
      mockResponseBody.filter((element, index, array) => index < limit)
    );
  }

  return res.send(mockResponseBody);
});

type ReqParams = { id: number };

app.get("/menus/:id", (req: express.Request<ReqParams, {}, {}, {}>, res) => {
  // TODO: will use for query in database
  const { id } = req.params;

  return res.send({
    id: 1,
    name: "ผัดกระเพราไก่",
    price: 50,
    current_price: 40,
    category_name: "ผัด",
  });
});

app.listen(5000);
