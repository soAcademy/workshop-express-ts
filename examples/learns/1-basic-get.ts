import express from "express";
const app = express();

app.get("/menus", (_, res) => {
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

  return res.send(mockResponseBody);
});

app.listen(5000);
