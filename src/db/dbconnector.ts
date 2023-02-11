import { Pool } from "pg";
import { appConfig } from "../config";

const dbconnectorPool = new Pool({
  max: 20,
  connectionString: appConfig.postgresConnectionString,
  idleTimeoutMillis: 30000,
});

export { dbconnectorPool };
