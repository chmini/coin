import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter);

export default app;
