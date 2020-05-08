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

const moneyBookRouter = express.Router();

// MONEYBOOK
moneyBookRouter.get(routes.calendar, calendar);

moneyBookRouter.get(routes.createCatalog, createCatalog);
moneyBookRouter.post(routes.createCatalog, uploadCatalog);

moneyBookRouter.get(routes.assets, assets);
moneyBookRouter.post(routes.assets, firstAssets);

moneyBookRouter.get(routes.daily, daily);

moneyBookRouter.get(routes.weekly, weekly);
moneyBookRouter.get(routes.monthly, monthly);

moneyBookRouter.get(routes.catalogDetail(), catalogDetail);

moneyBookRouter.post(routes.editCatalog(), editCatalog);

moneyBookRouter.get(routes.deleteCatalog(), deleteCatalog);

export default moneyBookRouter;
