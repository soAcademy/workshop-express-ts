import { Pool } from "pg";

const dbconnectorPool = new Pool({
  max: 20,
  connectionString: "postgres://postgres:1234@localhost:5432/postgres",
  idleTimeoutMillis: 30000,
});

export { dbconnectorPool };
