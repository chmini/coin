import express from "express";
import routes from "../routes";
import { home, getAdd, postAdd } from "../controllers/globalController";

const globalRouter = express.Router();

//global
globalRouter.get(routes.home, home);

globalRouter.get(routes.add, getAdd);
globalRouter.post(routes.add, postAdd);

export default globalRouter;
