import express from "express";
import routes from "../routes";
import {
  add,
  calendar,
  daily,
  weekly,
  monthly,
} from "../controllers/moneyBookController";

const moneyBookRouter = express.Router();

// MONEYBOOK
moneyBookRouter.get(routes.add, add);
moneyBookRouter.get(routes.calendar, calendar);
moneyBookRouter.get(routes.daily, daily);
moneyBookRouter.get(routes.weekly, weekly);
moneyBookRouter.get(routes.monthly, monthly);

export default moneyBookRouter;
