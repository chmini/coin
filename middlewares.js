import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Money Book";
  res.locals.routes = routes;
  res.locals.moneybook = routes.moneybook;

  res.locals.loggedUser = "test";
  next();
};
