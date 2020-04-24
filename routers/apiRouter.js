import express from "express";
import routes from "../routes";
import { getCatalog, getCategory } from "../controllers/moneyBookController";

const apiRouter = express.Router();

// API
apiRouter.post(routes.catalog, getCatalog);
apiRouter.post(routes.category, getCategory);

export default apiRouter;
