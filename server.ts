import express from "express";
import cors from "cors";
import mainRouter from "./api/v1/routers/index";
import dotenv from "dotenv";
import connectDb from "./api/config/db";
import handleError from "./api/v1/middleware/handleError";

dotenv.configDotenv();
const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    // credentials: true,
    // allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 200,
  })
);
app.use((req, res, next) => {
  // res.header("Content-Type", "multipart/form-data");
  // res.header("Content-Type", "application/json;charset=UTF-8");
  // res.header("Access-Control-Allow-Credentials", "true");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", mainRouter);
app.use(handleError);

app.listen(port, () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
