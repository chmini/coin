import express from "express";
import routes from "../routes";
import { getData } from "../controllers/moneyBookController";

const apiRouter = express.Router();

// API
apiRouter.post(routes.data, getData);

export default apiRouter;
