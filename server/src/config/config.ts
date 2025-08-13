import { config } from "dotenv";
config();

export const envConfig = {
  portNumber: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dbPort: process.env.DB_PORT,
};
