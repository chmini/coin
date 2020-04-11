import express from "express";
import routes from "../routes";
import { join, login, logout } from "../controllers/userController";
import { home } from "../controllers/moneyBookController";

const globalRouter = express.Router();

// GLOBAL
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
