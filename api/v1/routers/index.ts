import httpError from "http-errors";
import { Router } from "express";
import AdminRouter from "./admin";
import ClientRouter from "./client";

const router = Router();

// router.use('/me', UserRouter);
// //admin
router.use("/admin", AdminRouter);
//client
router.use("/", ClientRouter);

router.use("/*", (_, res, next) => {
  return next(httpError.NotFound("API not found"));
});

router.get("/", (_, res) => {
  res.status(200).send({
    success: true,
    message: "API is running",
  });
});
export default router;
