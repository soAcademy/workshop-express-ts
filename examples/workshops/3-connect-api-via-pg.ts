import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();

// pg
import { Pool } from "pg";

const pool = new Pool({
  max: 20,
  connectionString: "postgres://postgres:1234@localhost:5432/example_school",
  idleTimeoutMillis: 30000,
});
// pg

// model
type Course = {
  id: number;
  name: string;
  price: number;
  start_date: Date;
  end_date: Date;
  student_max: number;
  categories_id: number;
  teachers_id: number;
};

type ReqQuery = {
  limit: number;
};
// model

app.use(bodyParser.json());

app.get(
  "/courses",
  async (req: Request<{}, {}, {}, ReqQuery>, res: Response) => {
    const client = await pool.connect();
    try {
      const { query } = req;
      const limit: number = query.limit > 0 ? query.limit : 10;

      const sql = `SELECT * FROM public.courses
                    limit ${limit}`;
      const { rows } = await client.query(sql);
      const menus: Course[] = rows;

      res.send(menus);
    } catch (error) {
      res.status(400).send(error);
    } finally {
      client.release();
    }
  }
);

app.post("/courses", async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const course = req.body as Course;

    const sql = `
        INSERT INTO public.courses
        ("name", price, start_date, end_date, student_max, categories_id, teachers_id)
        VALUES('${course.name}', ${course.price}, '${course.start_date}', '${course.end_date}',
         ${course.student_max}, ${course.categories_id}, ${course.teachers_id});
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
