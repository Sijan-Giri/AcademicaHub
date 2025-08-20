import express from "express";
import authRoute from "./routes/auth/authRoute"
import instituteRoute from "./routes/institute/instituteRoute"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoute);
app.use("/api/institute",instituteRoute)

export default app;
