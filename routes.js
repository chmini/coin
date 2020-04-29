// GLOBAL
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// USER
const USER = "/user";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// MONEYBOOK
const MONEYBOOK = "/moneybook";
// MONEYBOOK - CATALOG
const CREATE_CATALOG = "/add";
const CATALOG_DETAIL = "/:id";
const EDIT_CATALOG = "/:id/edit";
const DELETE_CATALOG = "/:id/delete";
// MONEYBOOK - ASSETS
const ASSETS = "/assets";
// MONEYBOOK - VIEW
const CALENDAR = "/calendar";
const DAILY = "/daily";
const WEEKLY = "/weekly";
const MONTHLY = "/monthly";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API
const API = "/api";
const GET_CATALOG = "/catalog";
const GET_CATEGORY = "/category";
const GET_STATS = "/stats";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  user: USER,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  moneybook: MONEYBOOK,
  createCatalog: CREATE_CATALOG,
  catalogDetail: (id) => {
    if (id) return `/moneybook/${id}`;
    else return CATALOG_DETAIL;
  },
  editCatalog: (id) => {
    if (id) return `/moneybook/${id}/edit`;
    else return EDIT_CATALOG;
  },
  deleteCatalog: (id) => {
    if (id) return `/moneybook/${id}/delete`;
    else return DELETE_CATALOG;
  },
  assets: ASSETS,
  calendar: CALENDAR,
  daily: DAILY,
  weekly: WEEKLY,
  monthly: MONTHLY,
  github: GITHUB,
  githubCallBack: GITHUB_CALLBACK,
  api: API,
  catalog: GET_CATALOG,
  category: GET_CATEGORY,
  stats: GET_STATS,
};

export default routes;
