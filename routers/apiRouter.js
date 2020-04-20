import express from "express";
import routes from "../routes";
import { getInout } from "../controllers/moneyBookController";

const apiRouter = express.Router();

// API
apiRouter.post(routes.dataInout, getInout);

export default apiRouter;
