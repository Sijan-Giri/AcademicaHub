import {config} from "dotenv";
config();

export const envConfig = {
    portNumber : process.env.PORT,
    database : process.env.DATABASE,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    host : process.env.HOST,
    dbport : process.env.DB_PORT
}
