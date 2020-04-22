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
const ADD_INOUT = "/add";
const INOUT_DETAIL = "/:id";
const EDIT_INOUT = "/:id/edit";
const DELETE_INOUT = "/:id/delete";
const TOTAL_ASSET = "/totalAsset";
const CALENDAR = "/calendar";
const DAILY = "/daily";
const WEEKLY = "/weekly";
const MONTHLY = "/monthly";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API
const API = "/api";
const GET_INOUTS = "/data-inout";

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
  addInout: ADD_INOUT,
  inoutDetail: (id) => {
    if (id) return `/moneybook/${id}`;
    else return INOUT_DETAIL;
  },
  editInout: (id) => {
    if (id) return `/moneybook/${id}/edit`;
    else return EDIT_INOUT;
  },
  deleteInout: (id) => {
    if (id) return `/moneybook/${id}/delete`;
    else return DELETE_INOUT;
  },
  totalAsset: TOTAL_ASSET,
  calendar: CALENDAR,
  daily: DAILY,
  weekly: WEEKLY,
  monthly: MONTHLY,
  github: GITHUB,
  githubCallBack: GITHUB_CALLBACK,
  api: API,
  dataInout: GET_INOUTS,
};

export default routes;
