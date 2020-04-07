import routes from "../routes";
import Cost from "../models/Cost";

const types = ["현금", "카드"];
let id;

const toStringDate = (date) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const strDay = day[date.getDay()];
  const strDate = date.getDate();
  const strMonth = date.getMonth() + 1;
  const strYear = date.getFullYear();
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
  id = objDate.id;
  res.render("add", { date: objDate.str, types });
};

export const postAdd = async (req, res) => {
  const {
    body: { type, group, amount },
  } = req;
  try {
    const newCost = await Cost.create({
      date: id,
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
