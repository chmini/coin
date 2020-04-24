import routes from "./routes";
import category from "./category";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Money Book";
  res.locals.routes = routes;
  res.locals.moneybook = routes.moneybook;
  res.locals.category = category;

  res.locals.loggedUser = "test";

  next();
};
