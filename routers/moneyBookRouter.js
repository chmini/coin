import express from "express";
import routes from "../routes";
import {
  calendar,
  daily,
  weekly,
  monthly,
  addInout,
  addInoutDB,
  inoutDetail,
  totalAsset,
  firstTotalAsset,
} from "../controllers/moneyBookController";

const moneyBookRouter = express.Router();

// MONEYBOOK
moneyBookRouter.get(routes.calendar, calendar);

moneyBookRouter.get(routes.addInout, addInout);
moneyBookRouter.post(routes.addInout, addInoutDB);

moneyBookRouter.get(routes.totalAsset, totalAsset);
moneyBookRouter.post(routes.totalAsset, firstTotalAsset);

moneyBookRouter.get(routes.inoutDetail(), inoutDetail);

moneyBookRouter.get(routes.daily, daily);
moneyBookRouter.get(routes.weekly, weekly);
moneyBookRouter.get(routes.monthly, monthly);

export default moneyBookRouter;
