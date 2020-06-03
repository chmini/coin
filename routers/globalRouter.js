import express from "express";
import routes from "../routes";
import {
  logout,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { home } from "../controllers/moneyBookController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

// GLOBAL
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);

export default globalRouter;
