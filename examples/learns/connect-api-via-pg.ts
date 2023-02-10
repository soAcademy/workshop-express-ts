import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();

// pg
import { Pool } from "pg";

const pool = new Pool({
  max: 20,
  connectionString: "postgres://postgres:1234@localhost:5432/postgres",
  idleTimeoutMillis: 30000,
});

// pg

// model
type MenuModel = {
  id: number;
  name: string;
  price: number;
  discount: string;
  categories_id: string;
};
// model

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/menus", async (_, res: Response) => {
  const client = await pool.connect();
  try {
    const sql = "SELECT * FROM food_menus";
    const { rows } = await client.query(sql);
    const menus: MenuModel[] = rows;

    res.send(menus);
  } catch (error) {
    res.status(400).send(error);
  } finally {
    client.release();
  }
});

app.post("/menus", async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const menu = req.body as MenuModel;

    const sql = `
        INSERT INTO public.food_menus
        ("name", price, discount, categories_id)
        VALUES('${menu.name}', ${menu.price}, ${menu.discount}, ${menu.categories_id});
        `;
    await client.query(sql);

    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  } finally {
    client.release();
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
