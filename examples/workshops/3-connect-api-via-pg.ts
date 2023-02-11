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
  sort: string;
  where?: string;
};

type ReqParams = {
  id: number;
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
      let sort = "asc";

      if (query.sort === "desc") {
        sort = query.sort;
      }

      let sql = `SELECT * FROM public.courses `;

      if (query.where) {
        sql = sql.concat(`where name like '%${query.where}%' `);
      }
      sql = sql.concat(`order by id ${sort} `);
      sql = sql.concat(`limit ${limit} `);

      const { rows } = await client.query(sql);
      const courses: Course[] = rows;

      res.send(courses);
    } catch (error) {
      res.status(400).send(error);
    } finally {
      client.release();
    }
  }
);

app.get(
  "/courses/:id",
  async (req: Request<ReqParams, {}, {}, {}>, res: Response) => {
    const client = await pool.connect();
    try {
      const { id } = req.params;

      let sql = `SELECT * FROM public.courses
                    where id = ${id}`;

      const { rows } = await client.query(sql);
      const courses: Course[] = rows;

      if (courses.length === 0) {
        return res
          .status(400)
          .send({ message: "cannot find your id in database" });
      }

      res.send(courses);
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
