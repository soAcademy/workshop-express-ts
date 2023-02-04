import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

type Course = {
  id: number;
  name: string;
  price: number;
  categories_name: string;
};

app.post("/courses", (req, res) => {
  const exitingDatas: Course[] = [
    {
      id: 1,
      name: "flutter-101",
      price: 20000,
      categories_name: "online",
    },
    {
      id: 2,
      name: "database-101",
      price: 12000,
      categories_name: "online",
    },
  ];

  if (exitingDatas.filter((o) => o.name === req.body.name).length > 0) {
    res.status(400).send();
    return;
  }

  // save to database here.

  res.status(201).send(req.body);
});

const port = 5000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
