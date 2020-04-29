import express from "express";
import routes from "../routes";
import {
  getCatalog,
  getCategory,
  getStats,
} from "../controllers/moneyBookController";

const apiRouter = express.Router();

// API
apiRouter.post(routes.catalog, getCatalog);
apiRouter.post(routes.category, getCategory);
apiRouter.post(routes.stats, getStats);

export default apiRouter;
