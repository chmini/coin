import express from "express";
import routes from "../routes";
import { getData, getStrDate } from "../controllers/globalController";

const apiRouter = express.Router();

//api
apiRouter.post(routes.getData, getData);
apiRouter.post(routes.getStrDate, getStrDate);

export default apiRouter;
