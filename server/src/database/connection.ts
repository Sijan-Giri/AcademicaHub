import { Sequelize } from "sequelize";
import { envConfig } from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.database as string,
  username: envConfig.username as string,
  password: envConfig.password as string,
  host: envConfig.host as string,
  dialect: "mysql",
  port: Number(envConfig.dbPort),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully !!");
  })
  .catch((err) => {
    console.log(err);
  });

export default sequelize;
