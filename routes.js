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
const ADD = "/add";
const CALENDAR = "/calendar";
const DAILY = "/daily";
const WEEKLY = "/weekly";
const MONTHLY = "/monthly";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API
const API = "/api";
const GET_DATA = "/data";
const GET_DATEOBJ = "/dateobj";

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
  add: ADD,
  calendar: CALENDAR,
  daily: DAILY,
  weekly: WEEKLY,
  monthly: MONTHLY,
  github: GITHUB,
  githubCallBack: GITHUB_CALLBACK,
  api: API,
  getData: GET_DATA,
  getDateObj: GET_DATEOBJ,
};

export default routes;
