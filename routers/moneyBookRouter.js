import express from "express";
import routes from "../routes";
import {
  calendar,
  createCatalog,
  uploadCatalog,
  assets,
  firstAssets,
  daily,
  weekly,
  monthly,
  catalogDetail,
  editCatalog,
  deleteCatalog,
} from "../controllers/moneyBookController";
import { onlyPrivate } from "../middlewares";

const moneyBookRouter = express.Router();

// MONEYBOOK
moneyBookRouter.get(routes.calendar, onlyPrivate, calendar);

moneyBookRouter.get(routes.createCatalog, onlyPrivate, createCatalog);
moneyBookRouter.post(routes.createCatalog, onlyPrivate, uploadCatalog);

moneyBookRouter.get(routes.assets, onlyPrivate, assets);
moneyBookRouter.post(routes.assets, onlyPrivate, firstAssets);

moneyBookRouter.get(routes.daily, onlyPrivate, daily);

moneyBookRouter.get(routes.weekly, onlyPrivate, weekly);
moneyBookRouter.get(routes.monthly, onlyPrivate, monthly);

moneyBookRouter.get(routes.catalogDetail(), onlyPrivate, catalogDetail);

moneyBookRouter.post(routes.editCatalog(), onlyPrivate, editCatalog);

moneyBookRouter.get(routes.deleteCatalog(), onlyPrivate, deleteCatalog);

export default moneyBookRouter;
