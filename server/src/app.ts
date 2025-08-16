import express from "express";
import authRoute from "./routes/auth/auth.route"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoute);

export default app;
