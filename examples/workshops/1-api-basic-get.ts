import * as express from "express";

const app = express();

type Course = {
  id: number;
  name: string;
  price: number;
  categories_name: string;
};

app.get("/courses", (_, res) => {
  const mockResponseBody: Course[] = [
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
    {
      id: 3,
      name: "full-stack-101",
      price: 15000,
      categories_name: "online",
    },
    {
      id: 4,
      name: "jira-101",
      price: 8000,
      categories_name: "online",
    },
  ];

  res.send(mockResponseBody);
});

app.listen(5000);
