import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "./routers/apiRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import moneyBookRouter from "./routers/moneyBookRouter";
import routes from "./routes";
import userRouter from "./routers/userRouter";

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
app.use(routes.user, userRouter);
app.use(routes.moneybook, moneyBookRouter);
app.use(routes.api, apiRouter);

export default app;
