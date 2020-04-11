import routes from "../routes";
import Cost from "../models/Cost";

/*
const types = ["현금", "카드"];
let dateId;

const toStringDate = (date) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const strDay = day[date.getUTCDay()];
  const strDate = date.getUTCDate();
  const strMonth = date.getUTCMonth() + 1;
  const strYear = date.getUTCFullYear();
  const info = {
    id: `${strYear}-${strMonth < 10 ? `0${strMonth}` : `${strMonth}`}-${
      strDate < 10 ? `0${strDate}` : `${strDate}`
    }`,
    str: `${strMonth}월 ${strDate}일 ${strDay}요일`,
  };
  return info;
};

export const home = async (req, res) => {
  res.render("home");
};

export const getAdd = (req, res) => {
  const {
    query: { date },
  } = req;
  const newDate = new Date(date);
  const objDate = toStringDate(newDate);
  dateId = objDate.id;
  res.render("add", { date: objDate.str, types });
};

export const postAdd = async (req, res) => {
  const {
    body: { incExp, type, group, amount },
  } = req;
  try {
    await Cost.create({
      date: dateId,
      incExp,
      type,
      group,
      amount,
    });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};

export const getData = async (req, res) => {
  const costs = await Cost.find({});
  res.json(costs);
};

export const getStrDate = (req, res) => {
  const {
    query: { date },
  } = req;
  res.json(toStringDate(new Date(date)));
};
*/
