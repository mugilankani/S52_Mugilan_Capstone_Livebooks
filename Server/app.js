import express from "express";
export const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/router.js";
import ErrorMiddleware from "./middlewar/Error.js";
import router from "./routes/cource.routes.js";
import orderRouter from "./routes/order.routes.js";
dotenv.config();
import notificationRoutes from "./routes/notification.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import layoutRoutes from "./routes/layout.router.js";
// body parser
app.use(express.json());

app.use(cors());

// cookies parser
app.use(cookieParser());

// using cors for our http request

app.use(
  cors({
<<<<<<< HEAD
    origin: ['http://localhost:3000'],
    credentials: true,
=======
    origin: process.env.ORIGIN,
>>>>>>> f661e90b4b1a9eea1c492fc42f6a217a1cd2a06c
  })
);

app.use("/api/v1", router, orderRouter, routes, notificationRoutes, analyticsRoutes, layoutRoutes);

// test the routes

app.get("/test", (req, res) => {
  res.status(200).send("API was Working");
});

app.all("*", (req, res) => {
  res.status(404).send(`route${req.originalUrl} was not found`);
});

app.use(ErrorMiddleware);
