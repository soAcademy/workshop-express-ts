import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: parseInt(process.env.PORT),
  postgresConnectionString: process.env.POSTGRES_CONNECTION_STRING,
};

export { appConfig };
