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
  editInout,
  deleteInout,
} from "../controllers/moneyBookController";

const moneyBookRouter = express.Router();

// MONEYBOOK
moneyBookRouter.get(routes.calendar, calendar);

moneyBookRouter.get(routes.addInout, addInout);
moneyBookRouter.post(routes.addInout, addInoutDB);

moneyBookRouter.get(routes.totalAsset, totalAsset);
moneyBookRouter.post(routes.totalAsset, firstTotalAsset);

moneyBookRouter.get(routes.daily, daily);
moneyBookRouter.get(routes.weekly, weekly);
moneyBookRouter.get(routes.monthly, monthly);

moneyBookRouter.get(routes.inoutDetail(), inoutDetail);

moneyBookRouter.post(routes.editInout(), editInout);

moneyBookRouter.get(routes.deleteInout(), deleteInout);

export default moneyBookRouter;
